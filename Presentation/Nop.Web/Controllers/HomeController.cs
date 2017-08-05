using System.Web.Mvc;
using Nop.Web.Framework.Security;
using Nop.Web.Models.Questions;
using CheckBoxList;
using System.Web.UI.WebControls;

namespace Nop.Web.Controllers
{
    public partial class HomeController : BasePublicController
    {
        [NopHttpsRequirement(SslRequirement.No)]
        public virtual ActionResult Index()
        {
            return View();
        }

        [NopHttpsRequirement(SslRequirement.No)]
        public virtual ActionResult Landing()
        {
          return View();
        }


        [NopHttpsRequirement(SslRequirement.No)]
        public virtual ActionResult Test()
        {
          return View(new QuestionViewModel());
        }

  }
}
