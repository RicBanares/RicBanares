using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Web;

namespace WebAPI.Controllers
{
    public class CardController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                    select 
                    CardID
                    ,convert(varchar(10),CreatedDate,120) as CreatedDate 
                    ,convert(varchar(10),UpdatedDate,120) as UpdatedDate 
                    ,InitialLoad
                    ,CurrentLoad        
                    ,convert(varchar(10),ExpirationDate,120) as ExpirationDate
                    ,CardType
                    ,IDNumber
                    from
                    dbo.RegularCard
                    ";
            DataTable RCtable = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["QLessAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(RCtable);
            }

            return Request.CreateResponse(HttpStatusCode.OK, RCtable);
        }

        public string post(Card rcard)
        {
            try
            {
                string query = @"
                insert into dbo.RegularCard values
                ('" + rcard.CreatedDate + @"'
                ,'" + rcard.UpdatedDate + @"'
                ,'" + rcard.InitialLoad + @"'
                ,'" + rcard.CurrentLoad + @"'
                ,'" + rcard.ExpirationDate + @"'
                ,'" + rcard.CardType + @"'
                ,'" + rcard.IDNumber + @"'
                )
                ";

                DataTable RCtable = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QLessAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(RCtable);
                }

                return "Added Successfully!!";
            }
            catch (Exception)
            {
                return "Failed to Add!!";
            }
        }

        public string put (Card rcard)
        {
            try
            {
                string query = @"
                update dbo.RegularCard set 
                CreatedDate= '" + rcard.CreatedDate + @"'
                ,UpdatedDate= '" + rcard.UpdatedDate + @"'
                ,InitialLoad= '" + rcard.InitialLoad + @"'
                ,CurrentLoad= '" + rcard.CurrentLoad + @"'
                ,ExpirationDate= '" + rcard.ExpirationDate + @"'
                ,CardType= '" + rcard.CardType + @"'
                ,IDNumber= '" + rcard.IDNumber + @"'
                where CardID=" + rcard.CardId + @"
                ";

                DataTable RCtable = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QLessAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(RCtable);
                }

                return "Updated Successfully!!";
            }
            catch (Exception)
            {
                return "Failed to Update!!";
            }
        }


        public string delete(int id)
        {
            try
            {
                string query = @"
                delete from dbo.RegularCard 
                where CardID=" + id + @"
                ";

                DataTable RCtable = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["QLessAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(RCtable);
                }

                return "Deleted Successfully!!";
            }
            catch (Exception)
            {
                return "Failed to Delete!!";
            }
        }

    }
}
