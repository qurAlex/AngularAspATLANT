using AngularAspATLANT.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularAspATLANT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        // GET: api/<ValuesController>

        [HttpGet("storekeepers")]
        public IEnumerable<Storekeeper> GetK()
        {
            using (StoreContext context = new StoreContext())
            {
                var storekeepers = context.Storekeepers.ToList();

                return storekeepers;
            }
        }

        // GET: api/<ValuesController>
        [HttpGet("details")]
        public IEnumerable<Detail> GetD()
        {
            using (StoreContext context = new StoreContext())
            {
                var details = context.Details.ToList();

                return details;
            }
        }

        // POST api/<ValuesController>
        [HttpPost("detail/")]
        public IActionResult PostDetail([FromBody] object jsonDetail)
        {
            Console.WriteLine(jsonDetail);
            using (StoreContext context = new StoreContext())
            {
                var details = context.Details.ToList();
                var detail = JsonConvert.DeserializeObject<Detail>(jsonDetail.ToString());
                detail.id = details.Max(x => x.id) + 1;
                context.Add(detail);
                context.SaveChanges();
            }
            return Accepted();
        }

        [HttpPost("storekeeper/")]
        public IActionResult PostStorekeeper([FromBody]object jsonName)
        {
            using (StoreContext context = new StoreContext())
            {
                var storekeepers = context.Storekeepers.ToList();
                var storekeeper = new Storekeeper();
                var name = JObject.Parse(jsonName.ToString());
                storekeeper.full_name = name["name"].ToString();
                storekeeper.id = storekeepers.Max(x => x.id) + 1;
                context.Add(storekeeper);
                context.SaveChanges();
            }
            return Accepted();
        }

        [HttpPost("post")]
        public void Post([FromBody] string value)
        {
            Console.WriteLine(1);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("details/{id}")]
        public void Put(int id, [FromBody] string value)
        {
            Console.WriteLine(id);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("storekeeper/{id}")]
        public IActionResult DeleteKeeper(int id)
        {
            using (StoreContext context = new StoreContext())
            {
                var details = context.Details.ToList();
                var keepers = context.Storekeepers.ToList();
                if(details.Where(n=> n.storeKeeper_id ==id).Where(n=>n.date_Delete==null).Count()==0)
                {
                    context.Storekeepers.Where(n => n.id == id).ExecuteDelete();
                    context.SaveChanges();
                    return Accepted();
                }
                return BadRequest();
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("detail/{id}")]
        public IActionResult DeleteDetail(int id)
        {
            Console.WriteLine("id="+id);
            using (StoreContext context = new StoreContext())
            {
                var details = context.Details.ToList();
                var detail = details.Where(n => n.id == id).First();
                if (detail.date_Delete == null)
                {
                    detail.date_Delete = DateTime.Now.Date;
                    context.Details.Update(detail);
                    context.SaveChanges();
                    return Accepted();
                }
                return BadRequest();
            }
        }
    }
}
