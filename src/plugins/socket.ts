import { io } from 'socket.io-client'
import '@socket.io/component-emitter'

export const socket = io('ws://localhost:3000')
