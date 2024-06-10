
import {configureStore} from '@reduxjs/toolkit'
import { crmSlice } from './crmSlice'
import { authSlice } from './auth/authSlice'
export const store = configureStore({

    reducer:{
        crm:crmSlice.reducer,
        auth:authSlice.reducer
    }

})