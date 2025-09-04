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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          session_id: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
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
      digital_certificates: {
        Row: {
          batch_id: string | null
          certificate_data: Json
          certificate_hash: string | null
          certificate_number: string
          created_at: string
          digital_signature: string | null
          download_count: number | null
          expiry_date: string
          id: string
          inspection_id: string | null
          issue_date: string | null
          issued_by: string
          issued_to: string
          qr_code: string
          status: string | null
          updated_at: string
          verification_url: string | null
        }
        Insert: {
          batch_id?: string | null
          certificate_data: Json
          certificate_hash?: string | null
          certificate_number: string
          created_at?: string
          digital_signature?: string | null
          download_count?: number | null
          expiry_date: string
          id?: string
          inspection_id?: string | null
          issue_date?: string | null
          issued_by: string
          issued_to: string
          qr_code: string
          status?: string | null
          updated_at?: string
          verification_url?: string | null
        }
        Update: {
          batch_id?: string | null
          certificate_data?: Json
          certificate_hash?: string | null
          certificate_number?: string
          created_at?: string
          digital_signature?: string | null
          download_count?: number | null
          expiry_date?: string
          id?: string
          inspection_id?: string | null
          issue_date?: string | null
          issued_by?: string
          issued_to?: string
          qr_code?: string
          status?: string | null
          updated_at?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "digital_certificates_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "digital_certificates_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspection_actions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          access_level: string
          batch_id: string | null
          certificate_id: string | null
          checksum: string | null
          created_at: string
          description: string | null
          document_type: string
          file_name: string
          file_size: number | null
          file_type: string | null
          id: string
          inspection_id: string | null
          organization_id: string | null
          status: string
          storage_path: string | null
          tags: string[] | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number | null
        }
        Insert: {
          access_level?: string
          batch_id?: string | null
          certificate_id?: string | null
          checksum?: string | null
          created_at?: string
          description?: string | null
          document_type: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          inspection_id?: string | null
          organization_id?: string | null
          status?: string
          storage_path?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number | null
        }
        Update: {
          access_level?: string
          batch_id?: string | null
          certificate_id?: string | null
          checksum?: string | null
          created_at?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          inspection_id?: string | null
          organization_id?: string | null
          status?: string
          storage_path?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number | null
        }
        Relationships: []
      }
      inspection_actions: {
        Row: {
          action_type: string
          batch_id: string | null
          certificate_issued: boolean | null
          completed_date: string | null
          contact_person: string | null
          created_at: string
          id: string
          inspector_id: string
          location: string | null
          notes: string | null
          photos: string[] | null
          priority: string | null
          quality_score: number | null
          scheduled_date: string | null
          status: string
          test_results: Json | null
          updated_at: string
        }
        Insert: {
          action_type: string
          batch_id?: string | null
          certificate_issued?: boolean | null
          completed_date?: string | null
          contact_person?: string | null
          created_at?: string
          id?: string
          inspector_id: string
          location?: string | null
          notes?: string | null
          photos?: string[] | null
          priority?: string | null
          quality_score?: number | null
          scheduled_date?: string | null
          status?: string
          test_results?: Json | null
          updated_at?: string
        }
        Update: {
          action_type?: string
          batch_id?: string | null
          certificate_issued?: boolean | null
          completed_date?: string | null
          contact_person?: string | null
          created_at?: string
          id?: string
          inspector_id?: string
          location?: string | null
          notes?: string | null
          photos?: string[] | null
          priority?: string | null
          quality_score?: number | null
          scheduled_date?: string | null
          status?: string
          test_results?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_actions_batch_id_fkey"
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
      notifications: {
        Row: {
          action_url: string | null
          category: string
          created_at: string
          data: Json | null
          expires_at: string | null
          id: string
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          category: string
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          category?: string
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          accreditation_body: string | null
          accreditation_expiry: string | null
          accreditation_number: string | null
          address: string
          certifications: string[] | null
          city: string
          country: string
          created_at: string
          description: string | null
          email: string | null
          id: string
          license_number: string | null
          name: string
          phone: string | null
          postal_code: string | null
          registration_number: string | null
          state: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          accreditation_body?: string | null
          accreditation_expiry?: string | null
          accreditation_number?: string | null
          address: string
          certifications?: string[] | null
          city: string
          country: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          license_number?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          registration_number?: string | null
          state?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          accreditation_body?: string | null
          accreditation_expiry?: string | null
          accreditation_number?: string | null
          address?: string
          certifications?: string[] | null
          city?: string
          country?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          license_number?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          registration_number?: string | null
          state?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          code: string
          created_at: string
          description: string | null
          hs_code: string | null
          id: string
          name: string
          organic_eligible: boolean | null
          parent_id: string | null
          shelf_life_days: number | null
          special_handling: string[] | null
          storage_requirements: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          hs_code?: string | null
          id?: string
          name: string
          organic_eligible?: boolean | null
          parent_id?: string | null
          shelf_life_days?: number | null
          special_handling?: string[] | null
          storage_requirements?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          hs_code?: string | null
          id?: string
          name?: string
          organic_eligible?: boolean | null
          parent_id?: string | null
          shelf_life_days?: number | null
          special_handling?: string[] | null
          storage_requirements?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_categories_parent_id"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
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
      quality_standards: {
        Row: {
          category: string
          code: string
          created_at: string
          description: string | null
          id: string
          issuing_body: string
          name: string
          renewal_required: boolean | null
          status: string
          test_parameters: Json | null
          updated_at: string
          validity_period_days: number | null
          version: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          issuing_body: string
          name: string
          renewal_required?: boolean | null
          status?: string
          test_parameters?: Json | null
          updated_at?: string
          validity_period_days?: number | null
          version?: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          issuing_body?: string
          name?: string
          renewal_required?: boolean | null
          status?: string
          test_parameters?: Json | null
          updated_at?: string
          validity_period_days?: number | null
          version?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          batch_id: string
          container_number: string | null
          created_at: string
          estimated_arrival: string | null
          estimated_departure: string | null
          exporter_id: string
          id: string
          importer_id: string
          port_of_discharge: string
          port_of_loading: string
          seal_number: string | null
          shipping_company: string | null
          special_instructions: string | null
          status: string
          temperature_controlled: boolean | null
          temperature_range: string | null
          tracking_number: string | null
          updated_at: string
          vessel_name: string | null
          voyage_number: string | null
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          batch_id: string
          container_number?: string | null
          created_at?: string
          estimated_arrival?: string | null
          estimated_departure?: string | null
          exporter_id: string
          id?: string
          importer_id: string
          port_of_discharge: string
          port_of_loading: string
          seal_number?: string | null
          shipping_company?: string | null
          special_instructions?: string | null
          status?: string
          temperature_controlled?: boolean | null
          temperature_range?: string | null
          tracking_number?: string | null
          updated_at?: string
          vessel_name?: string | null
          voyage_number?: string | null
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          batch_id?: string
          container_number?: string | null
          created_at?: string
          estimated_arrival?: string | null
          estimated_departure?: string | null
          exporter_id?: string
          id?: string
          importer_id?: string
          port_of_discharge?: string
          port_of_loading?: string
          seal_number?: string | null
          shipping_company?: string | null
          special_instructions?: string | null
          status?: string
          temperature_controlled?: boolean | null
          temperature_range?: string | null
          tracking_number?: string | null
          updated_at?: string
          vessel_name?: string | null
          voyage_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_shipments_batch_id"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          attachments: string[] | null
          batch_id: string
          comments: string | null
          completion_date: string | null
          created_at: string
          equipment_used: string | null
          id: string
          inspection_id: string | null
          laboratory_id: string | null
          methodology: string | null
          parameters: Json
          pass_fail: string | null
          review_date: string | null
          reviewed_by: string | null
          standard_id: string | null
          status: string
          technician_id: string | null
          test_date: string
          test_type: string
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          batch_id: string
          comments?: string | null
          completion_date?: string | null
          created_at?: string
          equipment_used?: string | null
          id?: string
          inspection_id?: string | null
          laboratory_id?: string | null
          methodology?: string | null
          parameters: Json
          pass_fail?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          standard_id?: string | null
          status?: string
          technician_id?: string | null
          test_date: string
          test_type: string
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          batch_id?: string
          comments?: string | null
          completion_date?: string | null
          created_at?: string
          equipment_used?: string | null
          id?: string
          inspection_id?: string | null
          laboratory_id?: string | null
          methodology?: string | null
          parameters?: Json
          pass_fail?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          standard_id?: string | null
          status?: string
          technician_id?: string | null
          test_date?: string
          test_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_test_results_batch_id"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_test_results_inspection_id"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_test_results_standard_id"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "quality_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_logs: {
        Row: {
          certificate_id: string | null
          created_at: string
          id: string
          ip_address: string | null
          user_agent: string | null
          verification_method: string
          verification_status: string
          verifier_id: string | null
        }
        Insert: {
          certificate_id?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          verification_method: string
          verification_status: string
          verifier_id?: string | null
        }
        Update: {
          certificate_id?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          verification_method?: string
          verification_status?: string
          verifier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_logs_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "digital_certificates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_certificate_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_my_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role_debug: {
        Args: Record<PropertyKey, never>
        Returns: {
          email: string
          metadata_role: string
          role: string
        }[]
      }
      update_user_role: {
        Args: { new_role: string; user_email: string }
        Returns: undefined
      }
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
