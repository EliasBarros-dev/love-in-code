import { useEffect, useState } from 'react'

const startDate = new Date('2013-09-23T00:00:00')

function ContadorTempoJuntos() {
  const [timeTogether, setTimeTogether] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const years = Math.floor(days / 365.25)
      const months = Math.floor((days % 365.25) / 30.44)
      const remainingDays = Math.floor((days % 365.25) % 30.44)

      setTimeTogether(
        `${years} anos, ${months} meses e ${remainingDays} dias juntos ❤️`
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>{timeTogether}</h1>
      <h2>Bem-vindoa ao nosso cantinho do amor 💕</h2>
    </div>
  )
}

export default ContadorTempoJuntos
