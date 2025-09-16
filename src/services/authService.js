const BASE_URL=`http://localhost:5143/api/users`;

export async function register(name,email,password) {
    try {
        const response = await fetch(`${BASE_URL}/register`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Test User3",
                email: "test12345@example.com",
                password: "123456"
            })
        });
        


        if (!response.ok) {
            throw new Error('Failed to register');
        }
        const data = await response.json();
        console.log(data);
        

        return data;
    } catch (error) {
        console.error('Error occured while trying to register:', error);
        throw error;
    }
}

export async function login(email,password) {
    try {
        const response = await fetch(`${BASE_URL}/login`,{
            method:"POST",
            body:JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occured while trying to login:', error);
        throw error;
    }
}