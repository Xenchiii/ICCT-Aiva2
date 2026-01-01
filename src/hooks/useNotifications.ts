import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
export default function useNotifications(){return useContext(NotificationContext)}
