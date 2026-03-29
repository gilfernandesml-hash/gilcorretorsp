import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const AdminAuthContext = createContext({});

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async (user) => {
      if (!user) {
        setAdmin(null);
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error || !data || !data.ativo) {
          setAdmin(null);
          await supabase.auth.signOut();
        } else {
          setAdmin({ ...user, adminData: data });
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await checkAdminStatus(session?.user ?? null);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoading(true);
      await checkAdminStatus(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginAdmin = async (email, password) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Verify if the logged user is in admins table
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (adminError || !adminData || !adminData.ativo) {
        await supabase.auth.signOut();
        throw new Error("Acesso negado. Usuário não é administrador ou está inativo.");
      }

      setAdmin({ ...authData.user, adminData });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAdmin = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminPermission = (permission) => {
    if (!admin || !admin.adminData || !admin.adminData.permissoes) return false;
    return admin.adminData.permissoes.includes(permission) || admin.adminData.permissoes.includes('all');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      admin, 
      isLoading, 
      isAuthenticated: !!admin, 
      loginAdmin, 
      logoutAdmin,
      checkAdminPermission
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);