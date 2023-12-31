﻿using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace RobDroneAndGOAuth.Model.User.UserDTOs
{
    public class LoginUserDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
