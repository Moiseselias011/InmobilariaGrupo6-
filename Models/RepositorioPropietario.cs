using System.Data;
using INMOBILIARIAGRUPO6.Models;
using MySqlConnector;

public int Alta(Propietario p)
{
    int res = -1 ; 
    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        string sql = $"INSERT INTO Propietarios (Nombre, Apellido,Dni,Telefono , Email , Clave) " + 
        $"VALUES  ( @nombre, @apellido, @dni, @telefono , @email, @clave);" +
        $"SELECT SCOPE_IDENTITY();";//DEVUELVE EL ID INSERTADO
        
       using(MySqlCommand command = new MySqlCommand(sql,connection))
        {
            command.CommandType = CommandType.Text;
            command.Parameters.AddWithValue("@nombre",p.nombre);
            command.Parameters.AddWithValue("@apellido",p.apellido);
            command.Parameters.AddWithValue("@dni",p.dni);
            command.Parameters.AddWithValue("@telefono",p.telefono);
            command.Parameters.AddWithValue("@email",p.email);

            connection.Open();
            res = Convert.ToInt32(command.ExecuteScalar());
            p.idPropietario = res ;
            connection.Close();

    
        }
    }
    return res;
}