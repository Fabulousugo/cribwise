/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

type Message = {
  id: number
  sender_id: string
  receiver_id: string
  message: string
  read: boolean
  created_at: string
}

export default function ConversationPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [otherUser, setOtherUser] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadConversation()
      markMessagesAsRead()
    }
  }, [user, params.id])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadConversation() {
    setLoadingMessages(true)
    try {
      // Get conversation details
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', params.id)
        .single()

      if (convError) throw convError

      // Get other user's ID
      const otherUserId = convData.user1_id === user!.id ? convData.user2_id : convData.user1_id

      // Get other user's profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('full_name, gender')
        .eq('id', otherUserId)
        .single()

      setOtherUser({ id: otherUserId, ...profileData })

      // Load messages
      await loadMessages()

    } catch (error) {
      console.error('Error loading conversation:', error)
    } finally {
      setLoadingMessages(false)
    }
  }

  async function loadMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', params.id)
        .order('created_at', { ascending: true })

      if (error) throw error

      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  async function markMessagesAsRead() {
    try {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('conversation_id', params.id)
        .eq('receiver_id', user!.id)
        .eq('read', false)
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !otherUser) return

    setSending(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          conversation_id: parseInt(params.id as string),
          sender_id: user!.id,
          receiver_id: otherUser.id,
          message: newMessage.trim()
        }])

      if (error) throw error

      setNewMessage('')
      await loadMessages()

    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (loading || loadingMessages) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl">Loading conversation...</div>
      </div>
    )
  }

  if (!user || !otherUser) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {otherUser.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="font-semibold text-lg">{otherUser.full_name}</h2>
                <p className="text-sm text-slate-500">{otherUser.gender}</p>
              </div>
            </div>

            <Link href={`/roommate/${otherUser.id}`}>
              <Button variant="outline" size="sm">View Profile</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.sender_id === user.id
            return (
              <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    isMe ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 border'
                  }`}>
                    <p className="whitespace-pre-wrap break-words">{message.message}</p>
                  </div>
                  <p className={`text-xs text-slate-500 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    {new Date(message.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={sending}
              className="flex-1"
            />
            <Button type="submit" disabled={sending || !newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}