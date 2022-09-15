using LeaveMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace LMSapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LMSoneContext _context;

        public LoginController(LMSoneContext context)
        {
            _context = context;
        }
        [Route("Login")]
        [HttpPost]
        public ActionResult employeeLogin(Login login)
        {
            var log = _context.Logins.Where(x => x.LoginId.Equals(login.LoginId) && x.Password.Equals(login.Password)).FirstOrDefault();

            if (log == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else

                return Ok(new { status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
        }
    }
}
