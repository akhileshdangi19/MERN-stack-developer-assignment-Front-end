"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Search, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserTable } from "@/components/user-table"
import { Pagination } from "@/components/pagination"

interface User {
  id: string
  name: string
  email: string
  profileImage: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUsers(response.data.users)
        setFilteredUsers(response.data.users)
        setTotalPages(Math.ceil(response.data.users.length / itemsPerPage))
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again.",
          variant: "destructive",
        })

        // If token is expired, redirect to login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          router.push("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [router, toast])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
      setTotalPages(Math.ceil(users.length / itemsPerPage))
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filtered)
      setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    }
    setCurrentPage(1)
  }, [searchQuery, users])

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredUsers.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader onLogout={handleLogout} />

      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold">User Management</h1>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
              <p className="text-lg font-medium">No users found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "There are no users in the system yet"}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <>
              <UserTable users={getCurrentPageItems()} />

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
