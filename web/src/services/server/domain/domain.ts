export interface IDomain {
    makeGet<T>(url: string): Promise<T>
}