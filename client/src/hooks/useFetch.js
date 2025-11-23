import { useEffect, useState } from "react"

export const useFetch = (url, options = {}, dependencies = []) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    
    
    useEffect(() => {
        
        const fetdata = async () => {
            setLoading(true)
            
            try {
                const response = await fetch(url, options)
                const reponseData = await response.json()
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}, ${response.status}`)
                }
    
                setData(reponseData)
                setError()               
            } catch (error) {
                setError(error)
        
            } finally {
                setLoading(false)
            }

        }
        fetdata()
    }, dependencies)


    return { data, loading, error}

}