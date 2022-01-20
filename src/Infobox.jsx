import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import "./Infobox.css"


function Infobox({ title, cases, active, total, isRed, ...props }) {


    return (
        <Card onClick={props.onClick} className={`infobox ${active && 'infobox--selected'} ${isRed && 'infobox--red'}`}>
            <CardContent>
                <Typography color="textSecondary" className="infobox__title">{title}</Typography>
                <h2 className={`infobox__cases ${!isRed && 'infobox__cases--green'}`}>{cases}</h2>
                <Typography color="textSecondary" className="infobox__total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
