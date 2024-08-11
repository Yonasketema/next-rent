export const createURL= (path:string)=>{
  return `${process.env.NEXTAUTH_URL}${path}`
}

export const signup = async (
  phone: string,
  email: string,
  password: string,
  location: string
) => {
  const res = await fetch(
    new Request(createURL('/api/auth/signup')),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        location,
        phone,
      }),
    }
  );

  const data = await res.json();

  return data.data;
};
