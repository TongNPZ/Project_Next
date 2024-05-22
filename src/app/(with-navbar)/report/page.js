'use client'
import React from "react"
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute"
import GetRequest from "@/app/ConfigAPI"

export default function report() {

    return(
        <ProtectRoute requireRoles={[1]}>
            <h1>This Is Report Page</h1>
        </ProtectRoute>
    )
}