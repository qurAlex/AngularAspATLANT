using System;
using System.Collections.Generic;

namespace AngularAspATLANT.Server;

public partial class Storekeeper
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public virtual ICollection<Detail> Details { get; set; } = new List<Detail>();
}
