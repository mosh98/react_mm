

export const storageSave = (key, value) => {
    /**
     * Storing in storage
     */
    localStorage.setItem(key, JSON.stringify(value))
}

export const storageRead = key =>{
    /**
     * Reading from storages
     */
    const data = localStorage.getItem(key)

    if (data) {
        return JSON.parse(data)
    }

    return null
}
export const storageRemove = key => {
    /**
     * Removing from storage
     */
    localStorage.removeItem(key)

}

