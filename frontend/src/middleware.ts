import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Solo proteger rutas que empiecen con /admin
  if (url.pathname.startsWith('/admin')) {
    // Si estamos en la página de login, dejamos pasar
    if (url.pathname === '/admin/login') {
      return next();
    }

    // Verificar la cookie de sesión
    const session = context.cookies.get('admin_session');
    
    // Si no hay sesión válida, redirigir al login
    if (!session || session.value !== 'authenticated') {
      return context.redirect('/admin/login');
    }
  }

  // Continuar normalmente para el resto de la web
  return next();
});
