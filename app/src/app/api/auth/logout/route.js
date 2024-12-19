import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function GET() {
    try {

        const cookieStore = await cookies()
        const token = cookieStore.get('token')
        console.log(token);
        
        if (token) {
            cookieStore.delete('token');
            return NextResponse.json({
                status: 200,
                message: 'Logged out successfully'
            })
        }
        else {
            return NextResponse.json({
                status: 401,
                message: 'Authentication Error'
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error'
        })
    }


}