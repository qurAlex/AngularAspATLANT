using System;
using System.Collections.Generic;

namespace AngularAspATLANT.Server;

public partial class Detail
{
    public int Id { get; set; }

    public string ItemCode { get; set; } = null!;

    public string ItemName { get; set; } = null!;

    public int? Count { get; set; }

    public int StorekeeperId { get; set; }

    public DateOnly DateCreate { get; set; }

    public DateOnly? DateDelete { get; set; }

    public virtual Storekeeper Storekeeper { get; set; } = null!;
}
