const controller = {}

controller.list = (req,res)=>{
   req.getConnection((err,conn)=>
 {
      if(err)
      {
        res.json(err)
      }
      else
      {
          conn.query('SELECT * FROM CUSTOMER', (err, rows)=>
         {
           if(err)
           {
             res.json(err)
           }
           else
           {
              console.log(rows.length)
              res.render('customerView',{
                data:rows
              })
           }
         })
      }
 })
}






controller.save = (req,res)=>
{
   const data = req.body
   req.getConnection((err,conn)=>{
       if(err)
       {
         console.log(err+' al realizar la conexion')
         res.send('Oh oh se dío el siguiente error al realizar conexion '+ err)
       }
       else
       {
         conn.query('INSERT INTO `customer` set ?', [data], (err,rows)=>
         //conn.query('INSTERT INTO `customer` (`name`, `address`, `phone`) values (`Edgar`, `GUATE`, `15`)', (err,rows)=>
       {
         if(err)
         {
           console.log(err+' error al insertar datos')
           res.send('Oh oh se dío el siguiente error '+err)
         }
         else
         {
           console.log('works')
           //res.send('Funciono el INSERT')
           res.redirect('/')
         }
       })
       }
   })

}

controller.update = (req,res)=>
{
  const {id} = req.params

  req.getConnection((err,conn)=>
  {
    if(err)
    {
      res.send('Ohoh se obtuvo el siguiente error al relizar la conexion '+err)
    }
    else
    {
      conn.query("SELECT * FROM customer WHERE id = ?", [id], (err,rows)=>
      {
        if(err)
        {
          res.send('Ohoh se obtuvo el siguiente error al realizar la consulta '+err)
          console.log(err)
        }
        else
        {
          res.render('customerUpdate', {data: rows[0]})
          //console.log('las filas son '+rows)
        }

      })
    }
  })
}

controller.updateData = (req,res)=>
{
  const newData = req.body
  const {id} = req.params
  console.log(newData)

  req.getConnection((err, conn)=>
  {
    if(err)
    {
      console.log('Oh oh se obtuvo el siguiente error al realizar la conexion a la base de datos '+err)
    }
    else
    {
       conn.query("UPDATE customer set ? WHERE id=?", [newData, id], (err,rows )=>
     {
       if(err)
       {
         console.log('Oh oh se obtuvo el siguiente error al realizar la consulta '+err)
       }
       else
       {
          res.redirect('/')
       }
     })
    }
  }
  )
}


controller.delete = (req,res)=>
{
  const { id } = req.params

  req.getConnection ((err,conn)=>
{
  if(err)
  {
    res.send('Ohoh se obtuvo el siguiente error al realizar la conexion '+err)
  }
  else
  {
    conn.query('DELETE FROM customer WHERE id=?', [id], (err,rows)=>
  {
    if(err)
    {
      res-send('Se obtuvo el siguiente error al realizar la consulta '+err)
    }
    else
    {
       res.redirect('/')
    }
  })
  }
})
}




module.exports = controller
