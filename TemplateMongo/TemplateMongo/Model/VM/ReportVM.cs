﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateMongo.Model.VM
{
    public class ReportVM :Report
    {
        public Vehicle vehicle { get; set; }
        public ReportVM()
        {
            this.user = new User();
            this.workEvents = new List<WorkEvent>();
        }
    }
}
