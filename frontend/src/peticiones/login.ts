
const POST_NUEVO_USUARIO = process.env.NEXT_PUBLIC_NUEVO_USUARIO
const POST_LOGIN = process.env.NEXT_PUBLIC_LOGIN

export const postCreaUsuario = async (data: any) => {
  try {
    const response = await fetch(`${POST_NUEVO_USUARIO}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Error al registrar el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return null;
  }
}

export const postLogin = async (data: any) => {
  try {
    const response = await fetch(`${POST_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
}