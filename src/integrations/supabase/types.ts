export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      batches: {
        Row: {
          batch_number: string
          certificate_id: string | null
          created_at: string | null
          description: string | null
          harvest_date: string
          id: string
          inspection_date: string | null
          origin_location: string
          processing_date: string | null
          product_name: string
          product_type: string
          qa_agency_id: string | null
          qr_code: string | null
          quantity: number
          status: string | null
          unit: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          batch_number: string
          certificate_id?: string | null
          created_at?: string | null
          description?: string | null
          harvest_date: string
          id?: string
          inspection_date?: string | null
          origin_location: string
          processing_date?: string | null
          product_name: string
          product_type: string
          qa_agency_id?: string | null
          qr_code?: string | null
          quantity: number
          status?: string | null
          unit: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          batch_number?: string
          certificate_id?: string | null
          created_at?: string | null
          description?: string | null
          harvest_date?: string
          id?: string
          inspection_date?: string | null
          origin_location?: string
          processing_date?: string | null
          product_name?: string
          product_type?: string
          qa_agency_id?: string | null
          qr_code?: string | null
          quantity?: number
          status?: string | null
          unit?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          batch_id: string
          certificate_number: string
          created_at: string | null
          digital_signature: string | null
          expiry_date: string
          id: string
          issue_date: string | null
          issued_by: string
          issued_to: string
          qr_code: string
          status: string | null
          vc_data: Json | null
        }
        Insert: {
          batch_id: string
          certificate_number: string
          created_at?: string | null
          digital_signature?: string | null
          expiry_date: string
          id?: string
          issue_date?: string | null
          issued_by: string
          issued_to: string
          qr_code: string
          status?: string | null
          vc_data?: Json | null
        }
        Update: {
          batch_id?: string
          certificate_number?: string
          created_at?: string | null
          digital_signature?: string | null
          expiry_date?: string
          id?: string
          issue_date?: string | null
          issued_by?: string
          issued_to?: string
          qr_code?: string
          status?: string | null
          vc_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      inspections: {
        Row: {
          batch_id: string
          completed_date: string | null
          created_at: string | null
          id: string
          inspector_id: string
          location: string
          notes: string | null
          photos: string[] | null
          quality_score: number | null
          scheduled_date: string
          status: string | null
          test_results: Json | null
          updated_at: string | null
        }
        Insert: {
          batch_id: string
          completed_date?: string | null
          created_at?: string | null
          id?: string
          inspector_id: string
          location: string
          notes?: string | null
          photos?: string[] | null
          quality_score?: number | null
          scheduled_date: string
          status?: string | null
          test_results?: Json | null
          updated_at?: string | null
        }
        Update: {
          batch_id?: string
          completed_date?: string | null
          created_at?: string | null
          id?: string
          inspector_id?: string
          location?: string
          notes?: string | null
          photos?: string[] | null
          quality_score?: number | null
          scheduled_date?: string
          status?: string | null
          test_results?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inspections_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string
          certifications: string | null
          country: string
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          license_number: string | null
          organization_name: string
          organization_type: string
          phone: string | null
          role: string
          status: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address: string
          certifications?: string | null
          country: string
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          license_number?: string | null
          organization_name: string
          organization_type: string
          phone?: string | null
          role: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string
          certifications?: string | null
          country?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          license_number?: string | null
          organization_name?: string
          organization_type?: string
          phone?: string | null
          role?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
