export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          metadata: Json
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string | null
          content: string
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          reading_minutes: number | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          content: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          content?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          body_html: string
          created_at: string
          created_by: string | null
          from_email: string | null
          from_name: string | null
          id: string
          name: string
          recipients_count: number
          scheduled_at: string | null
          segment: string
          sent_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          created_at?: string
          created_by?: string | null
          from_email?: string | null
          from_name?: string | null
          id?: string
          name: string
          recipients_count?: number
          scheduled_at?: string | null
          segment?: string
          sent_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          created_at?: string
          created_by?: string | null
          from_email?: string | null
          from_name?: string | null
          id?: string
          name?: string
          recipients_count?: number
          scheduled_at?: string | null
          segment?: string
          sent_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      integration_credentials: {
        Row: {
          created_at: string
          id: string
          key_name: string
          last4: string
          provider: string
          secret_ref: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key_name: string
          last4: string
          provider: string
          secret_ref: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key_name?: string
          last4?: string
          provider?: string
          secret_ref?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          created_at: string
          created_by: string | null
          delta: number
          id: string
          product_id: string
          reason: string
          reference_order: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          delta: number
          id?: string
          product_id: string
          reason: string
          reference_order?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          delta?: number
          id?: string
          product_id?: string
          reason?: string
          reference_order?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_reference_order_fkey"
            columns: ["reference_order"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          admin_notes: string | null
          country: string
          country_other: string | null
          cover_letter: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          status: Database["public"]["Enums"]["job_application_status"]
          updated_at: string
          vacancy_id: string | null
          vacancy_slug: string | null
          vacancy_title: string
        }
        Insert: {
          admin_notes?: string | null
          country: string
          country_other?: string | null
          cover_letter: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["job_application_status"]
          updated_at?: string
          vacancy_id?: string | null
          vacancy_slug?: string | null
          vacancy_title: string
        }
        Update: {
          admin_notes?: string | null
          country?: string
          country_other?: string | null
          cover_letter?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          status?: Database["public"]["Enums"]["job_application_status"]
          updated_at?: string
          vacancy_id?: string | null
          vacancy_slug?: string | null
          vacancy_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "job_vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      job_vacancies: {
        Row: {
          created_at: string
          department: string
          description: string
          employment_type: string
          id: string
          is_active: boolean
          location: string
          posted_at: string
          requirements: string[]
          responsibilities: string[]
          short_description: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          description?: string
          employment_type?: string
          id?: string
          is_active?: boolean
          location?: string
          posted_at?: string
          requirements?: string[]
          responsibilities?: string[]
          short_description: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          employment_type?: string
          id?: string
          is_active?: boolean
          location?: string
          posted_at?: string
          requirements?: string[]
          responsibilities?: string[]
          short_description?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          image_snapshot: string | null
          is_subscription: boolean
          name_snapshot: string
          order_id: string
          product_id: string | null
          quantity: number
          sku_snapshot: string | null
          subscription_interval: string | null
          unit_price_ngn: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_snapshot?: string | null
          is_subscription?: boolean
          name_snapshot: string
          order_id: string
          product_id?: string | null
          quantity: number
          sku_snapshot?: string | null
          subscription_interval?: string | null
          unit_price_ngn: number
        }
        Update: {
          created_at?: string
          id?: string
          image_snapshot?: string | null
          is_subscription?: boolean
          name_snapshot?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          sku_snapshot?: string | null
          subscription_interval?: string | null
          unit_price_ngn?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          balance_amount_ngn: number
          created_at: string
          currency: string
          customer_notes: string | null
          deposit_amount_ngn: number
          email: string
          full_name: string
          id: string
          install_address: Json | null
          order_number: string
          paid_amount_ngn: number
          payment_status: Database["public"]["Enums"]["payment_status"]
          phone: string | null
          shipping_address: Json
          shipping_ngn: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal_ngn: number
          total_ngn: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          balance_amount_ngn?: number
          created_at?: string
          currency?: string
          customer_notes?: string | null
          deposit_amount_ngn?: number
          email: string
          full_name: string
          id?: string
          install_address?: Json | null
          order_number?: string
          paid_amount_ngn?: number
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string | null
          shipping_address?: Json
          shipping_ngn?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_ngn?: number
          total_ngn?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          balance_amount_ngn?: number
          created_at?: string
          currency?: string
          customer_notes?: string | null
          deposit_amount_ngn?: number
          email?: string
          full_name?: string
          id?: string
          install_address?: Json | null
          order_number?: string
          paid_amount_ngn?: number
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string | null
          shipping_address?: Json
          shipping_ngn?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_ngn?: number
          total_ngn?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_ngn: number
          channel: string | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["payment_kind"]
          order_id: string | null
          payload: Json
          provider: string
          provider_reference: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_ngn: number
          channel?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["payment_kind"]
          order_id?: string | null
          payload?: Json
          provider?: string
          provider_reference?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_ngn?: number
          channel?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["payment_kind"]
          order_id?: string | null
          payload?: Json
          provider?: string
          provider_reference?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          category: string
          client: string | null
          completed_at: string | null
          content: string | null
          cover_url: string | null
          created_at: string
          featured: boolean
          gallery: string[]
          id: string
          published: boolean
          slug: string
          sort_order: number
          summary: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client?: string | null
          completed_at?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          gallery?: string[]
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          summary: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client?: string | null
          completed_at?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          gallery?: string[]
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          banner_headline: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          banner_headline?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          banner_headline?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          compare_at_price_ngn: number | null
          created_at: string
          deposit_percent: number
          description: string | null
          id: string
          images: string[]
          is_active: boolean
          is_featured: boolean
          is_subscription: boolean
          low_stock_threshold: number
          name: string
          paystack_plan_code: string | null
          price_ngn: number
          short_description: string | null
          sku: string | null
          slug: string
          specs: Json
          stock: number
          subscription_interval: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          compare_at_price_ngn?: number | null
          created_at?: string
          deposit_percent?: number
          description?: string | null
          id?: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          is_subscription?: boolean
          low_stock_threshold?: number
          name: string
          paystack_plan_code?: string | null
          price_ngn: number
          short_description?: string | null
          sku?: string | null
          slug: string
          specs?: Json
          stock?: number
          subscription_interval?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          compare_at_price_ngn?: number | null
          created_at?: string
          deposit_percent?: number
          description?: string | null
          id?: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          is_subscription?: boolean
          low_stock_threshold?: number
          name?: string
          paystack_plan_code?: string | null
          price_ngn?: number
          short_description?: string | null
          sku?: string | null
          slug?: string
          specs?: Json
          stock?: number
          subscription_interval?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          assigned_to: string | null
          attachments: string[]
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["quote_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          attachments?: string[]
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          attachments?: string[]
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount_ngn: number
          cancelled_at: string | null
          created_at: string
          id: string
          interval: string
          next_payment_date: string | null
          order_id: string | null
          paystack_customer_code: string | null
          paystack_subscription_code: string | null
          plan_code: string | null
          product_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_ngn: number
          cancelled_at?: string | null
          created_at?: string
          id?: string
          interval?: string
          next_payment_date?: string | null
          order_id?: string | null
          paystack_customer_code?: string | null
          paystack_subscription_code?: string | null
          plan_code?: string | null
          product_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_ngn?: number
          cancelled_at?: string | null
          created_at?: string
          id?: string
          interval?: string
          next_payment_date?: string | null
          order_id?: string | null
          paystack_customer_code?: string | null
          paystack_subscription_code?: string | null
          plan_code?: string | null
          product_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      vault_delete_secret: { Args: { _id: string }; Returns: undefined }
      vault_read_secret: { Args: { _id: string }; Returns: string }
      vault_write_secret: {
        Args: { _name: string; _value: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "customer"
      job_application_status:
        | "new"
        | "reviewing"
        | "shortlisted"
        | "rejected"
        | "hired"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "installing"
        | "shipped"
        | "delivered"
        | "completed"
        | "cancelled"
        | "refunded"
      payment_kind: "full" | "deposit" | "balance" | "subscription"
      payment_status:
        | "unpaid"
        | "deposit_paid"
        | "fully_paid"
        | "refunded"
        | "failed"
      quote_status: "new" | "contacted" | "quoted" | "won" | "lost"
      service_type:
        | "web_design"
        | "digital_marketing"
        | "home_security"
        | "other"
      subscription_status:
        | "active"
        | "past_due"
        | "cancelled"
        | "paused"
        | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "customer"],
      job_application_status: [
        "new",
        "reviewing",
        "shortlisted",
        "rejected",
        "hired",
      ],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "installing",
        "shipped",
        "delivered",
        "completed",
        "cancelled",
        "refunded",
      ],
      payment_kind: ["full", "deposit", "balance", "subscription"],
      payment_status: [
        "unpaid",
        "deposit_paid",
        "fully_paid",
        "refunded",
        "failed",
      ],
      quote_status: ["new", "contacted", "quoted", "won", "lost"],
      service_type: [
        "web_design",
        "digital_marketing",
        "home_security",
        "other",
      ],
      subscription_status: [
        "active",
        "past_due",
        "cancelled",
        "paused",
        "pending",
      ],
    },
  },
} as const
