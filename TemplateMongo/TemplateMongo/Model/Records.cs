using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Records
    {
        public int _id { get; set; }
        public int mispar_rechev { get; set; }
        public int tozeret_cd { get; set; }
        public string sug_degem { get; set; }
        public string tozeret_nm { get; set; }

        public int degem_cd { get; set; }
        public string degem_nm { get; set; }
        public string ramat_gimur { get; set; }
        public string ramat_eivzur_betihuty { get; set; }
        public string kvutzat_zihum{ get; set; }
        public int shnat_yitzur{ get; set; }
        public string degem_manoa{ get; set; }
        public string mivchan_acharon_dt{ get; set; }
        public string tokef_dt { get; set; }
        public string baalut{ get; set; }
        public string misgeret { get; set; }
        public string sug_delek_nm { get; set; }   
        public string tzeva_rechev { get; set; }
        public string zmig_kidmi { get; set; }
        public string zmig_ahori { get; set; }
        public string kinuy_mishari{ get; set; }
        public double rank { get; set; }
    }
}
