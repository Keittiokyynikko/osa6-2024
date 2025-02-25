import {useNotificationValue} from "./NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  


  return (
    <div style={notification !== null ? style : null}>
      {notification}
    </div>
  )
}

export default Notification
