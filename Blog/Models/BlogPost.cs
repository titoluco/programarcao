﻿using Blog.Models.SEO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    

    public class BlogPost
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Link
        {
            get
            {
                return ShortDescription.UrlFriendly(50);
            }
        }
        public string favorito { get; set; }
    }

}
