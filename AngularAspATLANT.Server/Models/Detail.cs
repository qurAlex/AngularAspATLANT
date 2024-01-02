namespace AngularAspATLANT.Server.Models
{
    public class Detail
    {
        public int id { get; set; }
        public string item_code { get; set; }
        public string item_name { get; set; }
        public int count { get; set; }
        public int storeKeeper_id { get; set; }
        public DateTime date_Create { get; set; }
        public DateTime? date_Delete { get; set; }
    }
}
