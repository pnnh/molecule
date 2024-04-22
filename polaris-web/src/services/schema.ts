import { headers } from "next/headers"

export function schemaPortal() {
    const headersList = headers()
    const plSchema = headersList.get('PLSchema') || 'polaris'
    console.log('plSchema', plSchema)
    return plSchema
}