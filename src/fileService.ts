const isElectron = !!window.electronAPI

export async function saveData(data: object) {
  if (isElectron) {
    await window.electronAPI.writeData(data)
  } else {
    localStorage.setItem('userData', JSON.stringify(data))
  }
}

export async function loadData() {
  if (isElectron) {
    return await window.electronAPI.readData()
  } else {
    const raw = localStorage.getItem('userData')
    return raw ? JSON.parse(raw) : {}
  }
}