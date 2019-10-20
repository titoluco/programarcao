using Blog.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Blog.Services
{
    public class BlogService : IBlogService
    {
        IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _env;

        public BlogService(IHostingEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _env = env;
            _httpContextAccessor = httpContextAccessor;
            Favoritos();
        }

        private List<BlogPost> Posts
        {
            get
            {
                return new List<BlogPost>() {
                    //new BlogPost { PostId = 1, Title = "Obter posts via API", ShortDescription = "Como usar fetch para obter uma lista de posts do blog", favorito = "favorito adicionado" },
                    //new BlogPost { PostId = 2, Title = "Usando Indexed DB", ShortDescription = "Como salvar lista de posts utilizando indexed DB", favorito = "favorito"  },
                    //new BlogPost { PostId = 3, Title = "Gravando posts do blog no cache", ShortDescription = "Como usar a Cache API para salvar posts de blog que podem ser acessados offline", favorito = "favorito"  },
                    //new BlogPost { PostId = 4, Title = "Obtendo dado em cache com Service Worker", ShortDescription = "Como utilizar Service Worker para obter dado do cache quando o usuário está offline", favorito = "favorito"  },
                    //new BlogPost { PostId = 5, Title = "Criando uma Web App instalável", ShortDescription = "Como criar arquivos que permitem que você instale o seu aplicativo no seu celular", favorito = "favorito"  },
                    //new BlogPost { PostId = 6, Title = "Enviando notificações push", ShortDescription = "Como enviar notificações push que permitem notificar o usuário que tem o seu aplicativo instalado", favorito = "favorito"  },
                    //new BlogPost { PostId = 7, Title = "Micro front ends", ShortDescription = "Como criar Micro front ends", favorito = "favorito adicionado"  },
                    //new BlogPost { PostId = 8, Title = "Blazor", ShortDescription = "Como implementar uma SPA com Blazor client-side", favorito = "favorito adicionado"  },
                    //new BlogPost { PostId = 9, Title = "Xamarim", ShortDescription = "Como implementar uma aplicação Xamarim", favorito = "favorito adicionado"  },
                    //new BlogPost { PostId = 10, Title = "Unity", ShortDescription = "Como implementar uma aplicação Unity", favorito = "favorito"  },
                    //new BlogPost { PostId = 11, Title = "Angular", ShortDescription = "Como implementar uma aplicação Angular", favorito = "favorito adicionado"  },
                    //new BlogPost { PostId = 12, Title = "React", ShortDescription = "Como implementar uma aplicação React", favorito = "favorito"  }



                new BlogPost { PostId = 1, Title = "Obter posts via API", ShortDescription = "Como usar fetch para obter uma lista de posts do blog", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav1").ToString() },
                new BlogPost { PostId = 2, Title = "Usando Indexed DB", ShortDescription = "Como salvar lista de posts utilizando indexed DB", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav2").ToString()  },
                new BlogPost { PostId = 3, Title = "Gravando posts do blog no cache", ShortDescription = "Como usar a Cache API para salvar posts de blog que podem ser acessados offline", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav3").ToString()  },
                new BlogPost { PostId = 4, Title = "Obtendo dado em cache com Service Worker", ShortDescription = "Como utilizar Service Worker para obter dado do cache quando o usuário está offline", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav4").ToString()  },
                new BlogPost { PostId = 5, Title = "Criando uma Web App instalável", ShortDescription = "Como criar arquivos que permitem que você instale o seu aplicativo no seu celular", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav5").ToString()  },
                new BlogPost { PostId = 6, Title = "Enviando notificações push", ShortDescription = "Como enviar notificações push que permitem notificar o usuário que tem o seu aplicativo instalado", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav6").ToString()  },
                new BlogPost { PostId = 7, Title = "Micro front ends", ShortDescription = "Como criar Micro front ends", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav7").ToString()  },
                new BlogPost { PostId = 8, Title = "Blazor", ShortDescription = "Como implementar uma SPA com Blazor client-side", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav8").ToString()  },
                new BlogPost { PostId = 9, Title = "Xamarim", ShortDescription = "Como implementar uma aplicação Xamarim", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav9").ToString()  },
                new BlogPost { PostId = 10, Title = "Unity", ShortDescription = "Como implementar uma aplicação Unity", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav10").ToString()  },
                new BlogPost { PostId = 11, Title = "Angular", ShortDescription = "Como implementar uma aplicação Angular", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav11").ToString()  },
                new BlogPost { PostId = 12, Title = "React", ShortDescription = "Como implementar uma aplicação React", favorito = _httpContextAccessor.HttpContext.Session.GetString("fav12").ToString()  }
            };
            }
        }

        public void Favoritos()
        {
            for (int i = 1; i <= 12; i++)
            {
                string fav = _httpContextAccessor.HttpContext.Session.GetString($"fav{i}");
                if (string.IsNullOrWhiteSpace(fav))
                {
                    _httpContextAccessor.HttpContext.Session.SetString($"fav{i}", "favorito");
                }
            }
            //foreach (BlogPost post in Posts)
            //{
            //    httpContext.Session.SetString($"fav{post.PostId}", "favorito");
            //}
        }
        public string GetPostText(string link)
        {
            var post = Posts.FirstOrDefault(_ => _.Link == link);

            return File.ReadAllText($"{_env.WebRootPath}/Posts/{post.PostId}_post.md");
        }

        public List<BlogPost> GetLatestPosts()
        {
            return Posts.OrderByDescending(_ => _.PostId).Take(3).ToList();
        }

        public List<BlogPost> GetFavouritesPosts()
        {
            return Posts.OrderByDescending(_ => _.PostId).Where(x => x.favorito == "favorito adicionado").ToList();
        }

        public List<BlogPost> GetOlderPosts(int oldestPostId)
        {
            var posts = Posts.Where(_ => _.PostId < oldestPostId).OrderByDescending(_ => _.PostId).ToList();

            if (posts.Count < 3)
                return posts;

            return posts.Take(3).ToList();
        }
    }
}
