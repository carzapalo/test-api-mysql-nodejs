import {con} from '../db.js'

export const getEmployees=async (req,res)=> {
    try {
        const [rows]= await con.query('SELECT * FROM employee')
        res.json( rows)
    } catch (error) {
        return res.status(500).json({
            message:"Error"
        })
    }
}
export const getEmployee=async (req,res)=> {
    try {
        const [rows]= await con.query('SELECT * FROM employee WHERE id=?',[req.params.id])
    
    if(rows.length<=0) return res.status(404).json({message:"No se encontro empleado"})
    res.json( rows[0])
    } catch (error) {
        return res.status(500).json({
            message:"Error"
        })
    }
    
}

export const createEmployees=async (req,res)=> {
    try {
        const {name, salary} =req.body
    const [rows]= await con.query('INSERT INTO employee(name,salary) VALUES (?,?)',[name,salary])
    res.send({
        id: rows.insertId,
        name,
        salary
})
    } catch (error) {
        return res.status(500).json({
            message:"Error"
        })
    }
    
}
export const updateEmployees=async (req,res)=> {
    try {
        const {id} =req.params
    const {name,salary} =req.body

    const [result]= await con.query('UPDATE employee SET name= IFNULL(?,name), salary= IFNULL(?,salary) WHERE id=?',[name,salary,id])

    if(result.affectedRows ===0) return res.status(404).json({
        message:"Empleado no encontrado"
    })
    const [rows]= await con.query('SELECT * FROM employee WHERE id=?',[id])
    res.json( rows[0])
    } catch (error) {
        return res.status(500).json({
            message:"Error"
        })
    }
    
}
export const deleteEmployees=async (req,res)=> {
    try {
        const [result]= await con.query('DELETE FROM employee WHERE id=?',[req.params.id])
        if(result.affectedRows <=0) return res.status(404).json({
            message:"Empleado no encontrado"
        })
    // codigo 204 indica que se ejcuto correctamente pero no esta devolviendo nada
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message:"Error"
        })
    }

}
