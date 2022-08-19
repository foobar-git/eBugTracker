using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    // an interface does not contain any implementation logic
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}