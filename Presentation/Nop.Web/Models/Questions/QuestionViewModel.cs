using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Web.Models.Questions
{
  public class QuestionViewModel
  {
    public int[] EmsId { get; set; }
    public string BusinessDoes { get; set; }
    public string WebsiteGoal { get; set; }
    public bool HasWebsite { get; set; }
    public bool NeedsHosting { get; set; }

    #region Features
    public bool NeedCart { get; set; }
    public bool NeedSocialMedia { get; set; }
    public bool NeedEmailMarketing { get; set; }
    public bool NeedBlog { get; set; }
    public bool NeedPhotoGallery { get; set; }
    public bool NeedVideoEmbed { get; set; }
    public bool NeedSlider { get; set; }
    public bool NeedComments { get; set; }
    public bool NeedContactForm { get; set; }
    #endregion

    #region WebsiteQuestions
    public DateTime? WebsiteInitialDate { get; set; }
    public bool EditsWebsite { get; set; }
    public string LikeAboutWebsite { get; set; }
    public string DislikeAboutWebsite { get; set; }
    public string CarryAnythingIntoNewSite { get; set; }
    #endregion

    #region
    public bool RequestQuotes { get; set; }
    public bool IncreaseBrand { get; set; }
    public bool EducateAudience { get; set; }
    public bool EncourageSales { get; set; }
    public bool BuildMailList { get; set; }
    public bool EncourageSocialMediaEngagement { get; set; }
    #endregion

  }
}