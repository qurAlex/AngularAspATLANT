using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
        public ActionResult<IEnumerable<Storekeeper>> GetK()
        {
            try
            {
                using (StoreContext context = new StoreContext())
                {
                    var storekeepers = context.Storekeepers.Select(s => new Storekeeper
                    {
                        Id=s.Id,
                        FullName = s.FullName,
                        Details = s.Details.Select(d => new Detail
                        {
                            Id=d.Id,
                            ItemCode= d.ItemCode,
                            ItemName = d.ItemName,
                            Count=d.Count,
                            StorekeeperId = d.StorekeeperId,
                            DateCreate =d.DateCreate,
                            DateDelete = d.DateDelete,
                        }).ToList()
                    }).ToList();
                    
                    //var storekeepers = context.Storekeepers.ToList();
                    //foreach (Storekeeper storekeeper in storekeepers)
                    //{
                    //    var details = context.Details.Where(d => d.StorekeeperId == storekeeper.Id).ToList();
                    //    storekeeper.Details = details;
                    //}
                    return storekeepers;
                }
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        // GET: api/<ValuesController>
        [HttpGet("details")]
        public ActionResult<IEnumerable<Detail>> GetD()
        {
            try
            {
                using (StoreContext context = new StoreContext())
                {
                    var details = context.Details.ToList();
                    foreach (Detail detail in details)
                    {
                        var storekeeper = context.Storekeepers.Where(p => p.Id == detail.StorekeeperId).First();
                        detail.Storekeeper = new Storekeeper { Id = storekeeper.Id, FullName = storekeeper.FullName };
                    }
                    //var details = context.Details.ToList();

                    return details;
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        // POST api/<ValuesController>
        [HttpPost("detail/")]
        public IActionResult PostDetail([FromBody] Detail detail)
        {
            try
            {
                if (detail.ItemCode != "" && detail.ItemName != ""&& detail.StorekeeperId!=0)
                    using (StoreContext context = new StoreContext())
                    {
                        detail.Id = context.Details.Max(x => x.Id) + 1;
                        detail.Storekeeper = null!;
                        context.Add(detail);
                        context.SaveChanges();
                        return Accepted();
                    }
                return BadRequest();
            }catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        [HttpPost("storekeeper/")]
        public IActionResult PostStorekeeper([FromBody] Storekeeper storekeeper )
        {
            try
            {
                if (storekeeper.FullName != "" && storekeeper.FullName.Split().Length == 2)
                {
                    using (StoreContext context = new StoreContext())
                    {
                        storekeeper.Id = context.Storekeepers.Max(x => x.Id) + 1;
                        context.Add(storekeeper);
                        context.SaveChanges();
                        return Accepted();
                    }
                }
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
            
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("storekeeper/{id}")]
        public IActionResult DeleteKeeper(int id)
        {
            try
            {
                using (StoreContext context = new StoreContext())
                {
                    var details = context.Details;
                    var storekeeper = context.Storekeepers.Where(n => n.Id == id);
                    if (details.Where(n => n.StorekeeperId == id && n.DateDelete == null).Count() == 0 && storekeeper.Count() > 0)
                    {
                        storekeeper.ExecuteDelete();
                        context.SaveChanges();
                        return Accepted();
                    }
                    return BadRequest();
                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("detail/{id}")]
        public IActionResult DeleteDetail(int id)
        {
            try
            {
                using (StoreContext context = new StoreContext())
                {
                    var details = context.Details;
                    var detail = details.Where(n => n.Id == id).First();
                    if (detail.DateDelete == null)
                    {
                        detail.DateDelete = DateOnly.Parse(DateTime.Now.Date.ToShortDateString());
                        context.Details.Update(detail);
                        context.SaveChanges();
                        return Accepted();
                    }
                    return BadRequest();
                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }
    }
}
