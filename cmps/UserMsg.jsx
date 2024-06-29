import { eventBusService } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            clearTimeout(timeoutIdRef.current)
            setMsg(msg)
            timeoutIdRef.current = setTimeout(closeMsg, 5000);
        })

        return () => unsubscribe()

    }, [])


    function closeMsg() {
        clearTimeout(timeoutIdRef.current)
        setMsg(null)
    }

    if (!msg) return null
  return (
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>x</button>
      {msg.txt}
    </section>
  )
}

