import { NextResponse } from "next/server"

// This is a mock implementation for demonstration purposes
export async function GET(request: Request) {
  try {
    // In a real application, you would:
    // 1. Verify the JWT token
    // 2. Query the database for users

    // For demo purposes, we'll just return mock users
    const mockUsers = [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-01-15T12:00:00Z",
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-02-20T14:30:00Z",
      },
      {
        id: "user-3",
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-03-10T09:15:00Z",
      },
      {
        id: "user-4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-04-05T16:45:00Z",
      },
      {
        id: "user-5",
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-05-12T11:20:00Z",
      },
      {
        id: "user-6",
        name: "Sarah Brown",
        email: "sarah.brown@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-06-18T08:30:00Z",
      },
      {
        id: "user-7",
        name: "David Miller",
        email: "david.miller@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-07-22T13:10:00Z",
      },
      {
        id: "user-8",
        name: "Jennifer Taylor",
        email: "jennifer.taylor@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-08-30T15:55:00Z",
      },
      {
        id: "user-9",
        name: "Christopher Anderson",
        email: "christopher.anderson@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-09-14T10:40:00Z",
      },
      {
        id: "user-10",
        name: "Jessica Thomas",
        email: "jessica.thomas@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-10-25T17:25:00Z",
      },
      {
        id: "user-11",
        name: "Daniel Jackson",
        email: "daniel.jackson@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-11-08T09:50:00Z",
      },
      {
        id: "user-12",
        name: "Amanda White",
        email: "amanda.white@example.com",
        profileImage: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-12-19T14:15:00Z",
      },
    ]

    return NextResponse.json({ users: mockUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
