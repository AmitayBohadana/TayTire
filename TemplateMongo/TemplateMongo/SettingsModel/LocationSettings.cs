using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.SettingsModel
{
    public static class LocationSettings
    {
        public static readonly Dictionary<int, string> Locations_HE
        = new Dictionary<int, string>
        {
            { 1, "קדמי שמאל" },
            { 2, "אחורי שמאל" },
            { 3, "אחורי ימין" },
            { 4, "קדמי ימין" },
            { 5, "גלגל חלופי" }
            
        };

        
    }
}
