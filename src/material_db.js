let MaterialDb = `
Database,Material,Subtype,kgCO2e/kg,Comments,density,wastage,densityAssumption,wasteReference,Latest
ICE v3.0b 2019 (UK),Aggregate,General - incl. secondary & recycled,0.00757,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aggregate,General UK,0.00493,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aggregate,Virgin land won resources,0.00483,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aggregate,Virgin marine resources,0.00904,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aggregate,Recycled resources - without heat treatment,0.0061,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aggregate,Recycled resources - with heat treatment,0.11877,This is an estimate of a market average aggregate,2240,5,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Clay,"Expanded - bulk, loose",0.39321,This is an estimate of a market average aggregate,1760,5,from Engineering Toolbox,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - European,6.67,European mix incl. imports,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Sheet - European,6.58,European mix incl. imports,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Foil - European,7.47,European mix incl. imports,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Extruded profile - European,6.83,European mix incl. imports,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Cast - European,6.72,European mix incl. imports,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - Worldwide,13.1,Worldwide,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Sheet - Worldwide,13,Worldwide,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Foil - Worldwide,13.8,Worldwide,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Extruded profile - Worldwide,13.2,Worldwide,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,Cast - Worldwide,13.2,Worldwide,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Europe,5.58,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in North America,5.65,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Africa,12.4,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in China,14.6,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Japan,10.6,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Middle East,10.8,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Oceania,12.8,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Other Asia,15.9,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in Russia,5.55,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in South America,8.32,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Aluminium,General - made in South Korea,11.9,This data has been derived from the world aluminium LCA's,2700,10,Single value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Asphalt,3% bitumen binder content,0.0501,Straight run bitumen content by mass,2300,5,Mode from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Asphalt,4% bitumen binder content,0.0522,Straight run bitumen content by mass,2300,5,Mode from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Asphalt,5% bitumen binder content,0.0542,Straight run bitumen content by mass,2300,5,Mode from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Asphalt,6% bitumen binder content,0.0563,Straight run bitumen content by mass,2300,5,Mode from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Asphalt,7% bitumen binder content,0.0584,Straight run bitumen content by mass,2300,5,Mode from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Bitumen,Straight-run,0.191,"Source: Eurobitume 2012. Life cycle inventory, bitumen, EBA",2400,5,Highest from CIBSE data (composite flooring),Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Bitumen,Polymer modified (PMB),326,"Source: Eurobitume 2012. Life cycle inventory, bitumen, EBA",2400,5,Highest from CIBSE data (composite flooring),Assumed as 5% for baseline,TRUE
ICE v3.0b 2019 (UK),Bricks,General (common brick),0.21,None,2100,20,Single value from the concrete society,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,General (UK average),0.832,Mixture taken from average UK sector cement EPD,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,"Average CEM I, OPC",0.912,This is a standard cement with no cementitious additions,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-S - 13% GGBS,0.803,This cement permits between 6-20% GGBS,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-S - 28% GGBS,0.672,This cement permits between 21-35% GGBS,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-P - 13% natural pozzolanic ash,0.798,This cement permits between 6-20% natural pozzolanic ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-P - 28% natural pozzolanic ash,0.661,This cement permits between 21-35% natural pozzolanic ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-V - 13% fly ash siliceous,0.798,This cement permits between 6-20% siliceous fly ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-V - 28% fly ash siliceous,0.661,This cement permits between 21-35% siliceous fly ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-W - 13% fly ash calcareous,0.798,This cement permits between 6-20% calcareous fly ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-W - 28% fly ash calcareous,0.661,This cement permits between 21-35% calcareous fly ash,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-L - 13% limestone,0.799,This cement permits between 6-20% limestone,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-L - 28% limestone,0.664,This cement permits between 21-35% limestone,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-A-M - 16% cement replacement,0.774,This cement permits between 12-20% cement replacement,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM II-B-M - 28% cement replacement,0.666,This cement permits between 21-35% cement replacement,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM III-A - 50.5% GGBS,0.475,This cement permits between 36-65% GGBS,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM III-B - 73% GGBS,0.278,This cement permits between 66-80% GGBS,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM-III-C - 88% GGBS,0.147,This cement permits between 81-95% GGBS,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM-IV-A - 23% cement replacement,0.707,This cement permits between 11-35% pozzolanic materials,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM-IV-B - 46% cement replacement,0.501,This cement permits between 38-55% pozzolanic materials,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM-V-A - 24% GGBS & 24% cement replacement,0.489,This cement permits between 18-30% GGBS and 18-30% pozzolanic materials,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Cement,CEM-V-B - 36% GGBS & 36% cement replacement,0.284,This cement permits between 31-49% GGBS and 31-49% pozzolanic materials,1860,5,General cement value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:3 cement sand mix (CEMI),0.2,Modelled with CEMI,1688,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:4 cement sand mix (CEMI),0.163,Modelled with CEMI,1677,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:5 cement sand mix (CEMI),0.138,Modelled with CEMI,1669,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:6 cement sand mix (CEMI),0.12,Modelled with CEMI,1664,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:0.5:4.5 cement lime sand mix (CEMI),0.169,Modelled with CEMI,1812,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:1:6 cement lime sand mix (CEMI),0.152,Modelled with CEMI,1873,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:2:9 cement lime sand mix (CEMI),0.133,Modelled with CEMI,1935,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:3 cement sand mix (UK Average),0.183,Modelled with CEMI,1688,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:4 cement sand mix (UK Average),0.149,Modelled with CEMI,1677,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:5 cement sand mix (UK Average),0.127,Modelled with CEMI,1669,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:6 cement sand mix (UK Average),0.11,Modelled with CEMI,1664,5,Calculated from sand (1631 kg/m3)  & cement (1860 kg/m3) densities,WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:0.5:4.5 cement lime sand mix (UK Average),0.157,Modelled with CEMI,1812,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:1:6 cement lime sand mix (UK Average),0.142,Modelled with CEMI,1873,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Mortar,1:2:9 cement lime sand mix (UK Average),0.127,Modelled with CEMI,1935,5,"Calculated from sand (1631 kg/m3), lime (3340 kg/m3) & cement (1860 kg/m3) densities",WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,General,1.67,Average of all EPD data collected,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Air entrainers (Europe),0.527,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Hardening accelerators,2.28,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Placticisers & superplacticisers,1.88,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Retarders,1.31,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Set accelerators,1.33,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete admixtures,Water resisting,2.67,European EPDs from EFCA,1300,4,Average from IBU PCR 0.7.2014 Part B for concrete admixtures,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,General,0.103361345,Strongly advised not to select general for concrete if content is known,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa),0.065413856,Assumed 150 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa),0.089870082,Assumed 220 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/15 MPa),0.097099819,Assumed 240 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa),0.104183166,Assumed 260 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,20/25 MPa,0.112022811,Assumed 285 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,25/30 MPa,0.119017286,Assumed 305 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,28/35 MPa,0.126021336,Assumed 325 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,32/40 MPa,0.138244351,Assumed 360 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,35/45 MPa,0.148699729,Assumed 390 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,40/50 Mpa,0.159124859,Assumed 420 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1,0.126018557,Assumed 325 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2,0.138248429,Assumed 360 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - with CEM I,0.070437227,"Assumed 150 kg cementitious content per m3 concrete. Compressive strength designation C6/8 Mpa.  28 day compressive strength under British cube method of 8 MPa, under European cylinder method 6 MPa. Possible uses: Kerb bedding and backing. Data is only cradle to factory gate.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - with CEM I,0.097192891,"Assumed 220 kg cementitious content per m3 concrete.Possible uses: mass concrete, mass fill, mass foundations, trench foundations, blinding, strip footing.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/15 MPa) - with CEM I,0.104959551,Assumed 240 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - with CEM I,0.112663883,Assumed 260 kg cementitious content per m3 concrete. Possible uses: garage floors.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - with CEM I,0.120928209,Assumed 285 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/30 (25/30 MPa) - with CEM I,0.128571933,Assumed 305 kg cementitious content per m3 concrete. Possible uses: reinforced foundations.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - with CEM I,0.136185061,"Assumed 325 kg cementitious content per m3 concrete. Possible uses: reinforced foundations, ground floors.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - with CEM I,0.149482537,"Assumed 360 kg cementitious content per m3 concrete. Possible uses: structural purposes, in situ floors, walls, superstructure.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - with CEM I,0.160874182,Assumed 390 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - with CEM I,0.172289283,"Assumed 420 kg cementitious content per m3 concrete. Possible uses: high strength applications, precasting.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - with CEM I,0.136181236,Assumed 325 kg cementitious content per m3 concrete. Possible uses: domestic parking and outdoor paving.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - with CEM I,0.149486616,Assumed 360 kg cementitious content per m3 concrete. Possible uses: heavy duty outdoor paving.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 14% Limestone,0.061434468,Assumed 147 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 14% Limestone,0.15422425,Assumed 430 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/15 MPa) - 14% Limestone,0.090489451,Assumed 235 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 14% Limestone,0.09663503,Assumed 255 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 14% Limestone,0.104028062,Assumed 279 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/30 (25/30 MPa) - 14% Limestone,0.110827786,Assumed 300 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 14% Limestone,0.117384856,Assumed 320 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 14% Limestone,0.128834231,Assumed 355 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 14% Limestone,0.140281057,Assumed 390 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 14% Limestone,0.152869896,Assumed 428 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 14% Limestone,0.116889914,Assumed 319 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 14% Limestone,0.129287759,Assumed 356 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 35% natural pozzolanic ash,0.055653295,Assumed 173 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 35% natural pozzolanic ash,0.075670552,Assumed 253 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/15 MPa) - 35% natural pozzolanic ash,0.081413702,Assumed 276 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 35% natural pozzolanic ash,0.08716595,Assumed 299 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 35% natural pozzolanic ash,0.094095576,Assumed 328 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/30 (25/30 MPa) - 35% natural pozzolanic ash,0.099829868,Assumed 351 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 35% natural pozzolanic ash,0.105882968,Assumed 375 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 35% natural pozzolanic ash,0.117064368,Assumed 420 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 35% natural pozzolanic ash,0.124111219,Assumed 449 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 35% natural pozzolanic ash,0.132634149,Assumed 483 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 35% natural pozzolanic ash,0.105567996,Assumed 374 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 35% natural pozzolanic ash,0.11731758,Assumed 421 kg cementitious content per m3 concrete.,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 15% fly ash,0.063909565,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 15% fly ash,0.12816178,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/15 MPa) - 15% fly ash,0.096113765,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 15% fly ash,0.103085312,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 15% fly ash,0.111010356,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/30 (25/30 MPa) - 15% fly ash,0.118001887,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 15% fly ash,0.126117949,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 15% fly ash,0.139079106,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 15% fly ash,0.148538474,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 15% fly ash,0.158975104,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 15% fly ash,0.125911465,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 15% fly ash,0.139277672,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 30% fly ash,0.056598322,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 30% fly ash,0.143537006,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/30 MPa) - 30% fly ash,0.085461064,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 30% fly ash,0.091549249,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 30% fly ash,0.098877227,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/30 (25/30 MPa) - 30% fly ash,0.105038992,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 30% fly ash,0.113086698,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 30% fly ash,0.125132545,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 30% fly ash,0.13272688,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 30% fly ash,0.141912552,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 30% fly ash,0.112747713,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 30% fly ash,0.125458217,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 40% fly ash,0.052306044,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 40% fly ash,0.070761249,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/40 MPa) - 40% fly ash,0.076058099,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 40% fly ash,0.081364047,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 40% fly ash,0.087762519,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/40 (25/40 MPa) - 40% fly ash,0.093052386,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 40% fly ash,0.098636908,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 40% fly ash,0.10894878,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 40% fly ash,0.115444931,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 40% fly ash,0.123301223,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 40% fly ash,0.098346089,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 40% fly ash,0.109182669,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 25% blast furnace slag,0.055084294,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 25% blast furnace slag,0.10288241,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/40 MPa) - 25% blast furnace slag,0.081194991,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 25% blast furnace slag,0.086950408,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 25% blast furnace slag,0.094183122,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/40 (25/40 MPa) - 25% blast furnace slag,0.100100107,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 25% blast furnace slag,0.10734228,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 25% blast furnace slag,0.120351695,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 25% blast furnace slag,0.129368483,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 25% blast furnace slag,0.138340244,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 25% blast furnace slag,0.107555678,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 25% blast furnace slag,0.120384029,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 50% blast furnace slag,0.040645484,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 50% blast furnace slag,0.091794497,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/40 MPa) - 50% blast furnace slag,0.058353565,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 50% blast furnace slag,0.062235569,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 50% blast furnace slag,0.067850282,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/40 (25/40 MPa) - 50% blast furnace slag,0.071969051,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 50% blast furnace slag,0.077919134,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 50% blast furnace slag,0.088802017,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 50% blast furnace slag,0.095224045,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 50% blast furnace slag,0.101547896,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 50% blast furnace slag,0.078212798,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 50% blast furnace slag,0.088844306,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 0 (6/8 MPa) - 70% blast furnace slag,0.034004889,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 1 (8/10 MPa) - 70% blast furnace slag,0.043729165,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 2 (12/40 MPa) - 70% blast furnace slag,0.046773802,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,GEN 3 (16/20 MPa) - 70% blast furnace slag,0.049716011,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 20/25 (20/25 MPa) - 70% blast furnace slag,0.05271424,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 25/40 (25/40 MPa) - 70% blast furnace slag,0.055567941,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 28/35 (28/35 MPa) - 70% blast furnace slag,0.058433276,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 32/40 (32/40 MPa) - 70% blast furnace slag,0.063414755,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 35/45 (32/40 MPa) - 70% blast furnace slag,0.067684172,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,RC 40/50 (40/50 MPa) - 70% blast furnace slag,0.071890992,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV1 - 70% blast furnace slag,0.058433276,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,PAV2 - 70% blast furnace slag,0.063418018,Estimated from ICE model,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,Precast pipe DN600,0.146166115,"per kg pipe. Not including installation, such as bedding materials",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,Precast paving,0.132367539,"Estimated from ICE Cement, Mortar, Concrete model.",2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,Precast beams and columns - with steel reinforcement,0.248989145,includes steel reinforcement,2400,4,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,"Precast block, medium density",0.09308795,"Estimated from ICE Cement, Mortar, Concrete model.",2400,5,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,"Precase block, high density",0.09308795,"Estimated from ICE Cement, Mortar, Concrete model.",6200,6,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Concrete,AAC block,0.28,"Based upon IBU EPD number, EPD-BPC-20170093-CCD1-EN, produced by British Precast.",2400,7,Compacted concrete value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,General,1.436967064,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 109 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,"Glazing, Double",1.625600014,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 10 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,Glazing triple,1.746990969,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 6 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,Toughened,1.667229702,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 43 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,"Multi layer safety, filled core, fire resistant, toughened",2.081791236,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 6 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,"Multi layer safety, unfilled",1.555515504,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 8 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Glass,"sky light or roof, with frame",3.101851852,"2.5kg glass per mm thickness, per m2. Embodied carbon of the glass is the average of data collected, from 5 datapoints",2500,1,Solid (soda lime) value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,UO Pipe,3.02,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Tin-free Electrolytic Chrome Coated Steel Sheet - Tin-free (ECCS),2.89,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,electrogalvanized steel,3.03,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,welded pipe,2.78,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Organic coated sheet,3.06,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Tinplate,2.85,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,finished cold-rolled coil,2.73,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,hot-dip galvanized steel,2.76,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Plate,2.46,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Cold Rolled Coil,2.53,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,pickled hot-rolled coil,2.42,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Wire rod,2.27,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Hot Rolled Coil,2.28,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Rebar,1.99,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Section,1.55,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,Engineering steel,1.27,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Steel,global seamless tube,2.13,World average steel,7800,0,General steel value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Average of all data - No Carbon Storage,0.492826143,"Average of data collected, 211 datapoints. This is not a weighted average. It is an average of all data collected on timber. Excludes Carbon Storage.",650,10,Pine value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Chipboard - No Carbon Storage,0.400163731,"Average of data collected, 6 datapoints.  Excludes Carbon Storage.",1330,10,https://www.ribaproductselector.com/Docs/1/00961/external/COL992473.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Closed panel timber frame system - No Carbon Storage,0.452459016,"Average of data collected, 1 datapoints. This dataset is based upon a single datapoint. It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,CLT - No Carbon Storage,0.437344479,"Average of data collected, 3 datapoints. This dataset is based upon a small sample size.  It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",700,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Fibreboard - No Carbon Storage,0.715306502,"Average of data collected, 5 datapoints. This dataset is based upon a small sample size.  It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",1330,10,https://www.ribaproductselector.com/Docs/1/00961/external/COL992473.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Glulam - No Carbon Storage,0.512127049,"Average of data collected, 13 datapoints.  Excludes Carbon Storage.",700,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Hardboard - No Carbon Storage,0.815247536,"Average of data collected, 1 datapoints. This dataset is based upon a single datapoint. It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Hardwood - No Carbon Storage,0.305560544,"Average of data collected, 22 datapoints.  Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Laminate - No Carbon Storage,0.69776337,"Average of data collected, 11 datapoints.  Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Laminated strand lumber - No Carbon Storage,0.504079166,"Average of data collected, 1 datapoints. This dataset is based upon a single datapoint. It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Laminated veneer lumber - No Carbon Storage,0.389801514,"Average of data collected, 5 datapoints. This dataset is based upon a small sample size.  It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",900,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,MDF - No Carbon Storage,0.856454322,"Average of data collected, 13 datapoints.  Excludes Carbon Storage.",720,10,https://www.ribaproductselector.com/Docs/1/27901/external/COL812459.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Open panel timber frame system - No Carbon Storage,0.345177665,"Average of data collected, 1 datapoints. This dataset is based upon a single datapoint. It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",700,10,https://www.ribaproductselector.com/Docs/4/27984/external/COL221166.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,OSB - No Carbon Storage,0.455069121,"Average of data collected, 16 datapoints.  Excludes Carbon Storage.",630,10,https://www.ribaproductselector.com/ProductReport.ashx?ci=5477&pr=Norbord-SterlingOSBZero,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Parquet - No Carbon Storage,0.811218986,"Average of data collected, 8 datapoints.  Excludes Carbon Storage.",1330,10,https://www.ribaproductselector.com/Docs/1/00961/external/COL992473.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Particle Board - No Carbon Storage,0.664265943,"Average of data collected, 13 datapoints.  Excludes Carbon Storage.",1330,10,https://www.ribaproductselector.com/Docs/1/00961/external/COL992473.pdf,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Plywood - No Carbon Storage,0.681464286,"Average of data collected, 11 datapoints.  Excludes Carbon Storage.",620,10,Average plywood value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Softwood - No Carbon Storage,0.262594458,"Average of data collected, 43 datapoints.  Excludes Carbon Storage.",563,10,Average softwood value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Wood I-Beam - No Carbon Storage,0.483302051,"Average of data collected, 37 datapoints.  Excludes Carbon Storage.",650,10,Pine value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Timber,Wood-plastic composite - No Carbon Storage,1.44,"Average of data collected, 1 datapoints. This dataset is based upon a single datapoint. It may therefore be subject to larger uncertainty than normal. Excludes Carbon Storage.",650,10,Pine value from CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Insulation,General,1.86,Estimated from typical market shares,110,15,From CIBSE data,WRAP,TRUE
ICE v3.0b 2019 (UK),Insulation,Fibreglass (Glasswool),1.35,"Poor data, difficult to select appropriate value",25,15,from insulation-info.org,WRAP,TRUE
ICE v3.0b 2019 (UK),Insulation,Flax,1.7,None,120,15,ScienceDirect,WRAP,TRUE
ICE v3.0b 2019 (UK),Insulation,Mineral wool,1.28,None,70,15,ScienceDirect,WRAP,TRUE
ICE v3.0b 2019 (UK),Insulation,Paper wool,0.63,None,65,16,ScienceDirect,WRAP,TRUE
ICE v2.0 2011 (UK),Brass,General,2.64,"Poor data availability. It is believed that the data may be largely dependent upon ore grade.  Poor carbon data, making estimate of embodied carbon difficult.",8500,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Brass,General - Virgin,4.8,"Poor data availability. It is believed that the data may be largely dependent upon ore grade.  Poor carbon data, making estimate of embodied carbon difficult.",8500,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Brass,General - Recycled,1.2,"Poor data availability. It is believed that the data may be largely dependent upon ore grade.  Poor carbon data, making estimate of embodied carbon difficult.",8500,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Bronze,General,4,Average of the only two references,8150,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Ceramics,General,0.7,"Very large data range, difficult to select values for general ceramics.  ",1850,5,Average ceramic tile value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Ceramics,Fittings,1.14,Ref. 1.,1850,5,Average ceramic tile value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Ceramics,Sanitary Products,1.61,Limited data.,1850,5,Average ceramic tile value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Ceramics,Tiles and Cladding Panels,0.78,"Difficult to select, large range, limited data. See Ref. 292.",1850,5,Average ceramic tile value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Clay,Tile,0.48,None,1900,5,Clay tiles value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Clay,Vitrified clay pipe DN 100 & DN 150,0.46,None,607,5,https://www.wavin.com/en-gb/-/media/Products/2018/01/29/21/15/31355_Hepworth-clayPipe-dimensions-and-weightspdf.ashx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Clay,Vitrified clay pipe DN 200 & DN 300,0.5,None,607,5,https://www.wavin.com/en-gb/-/media/Products/2018/01/29/21/15/31355_Hepworth-clayPipe-dimensions-and-weightspdf.ashx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Clay,Vitrified clay pipe DN 500,0.55,None,607,5,https://www.wavin.com/en-gb/-/media/Products/2018/01/29/21/15/31355_Hepworth-clayPipe-dimensions-and-weightspdf.ashx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Copper,EU Tube & Sheet,2.71,"EU production data, estimated from Kupfer Institut LCI data. 37% recycled content (the 3 year world average). World average data is expected to be higher than these values.",8600,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Copper,EU Tube & Sheet - Virgin,3.81,None,8600,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Copper,EU Tube & Sheet - Recycled,0.84,None,8600,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Copper,Recycled from high grade scrap ,1.1,"Uncertain, difficult to estimate with the data available.",8600,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Copper,Recycled from low grade scrap ,3.1,"Uncertain, difficult to estimate with the data available.",8600,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Insulation,Cork,0.19,Ref. 55.,110,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Insulation,Rockwool,1.12,Cradle to Grave,100,15,From CIBSE data. Can vary significantly.,WRAP,TRUE
ICE v2.0 2011 (UK),Iron,General,2.03,It was difficult to estimate the embodied energy and carbon of iron with the data available.,7870,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Lead,General,1.6681,"Allocated (divided) on a mass basis, assumes recycling rate of 61%",11340,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Lead,General - Virgin,3.37,None,11340,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Lead,General - Recycled,0.58,Scrap batteries are a main feedstock for recycled lead,11340,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Linoleum,General,1.21,"Data difficult to select, large data range.",1200,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Chromium,5.39,Ref. 22.,7190,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Lithium,5.3,Ref. 22.,534,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Mandolite,1.4,Ref. 1.,390,5,https://www.ribaproductselector.com/Product.aspx?ci=1486&pr=Promat-MANDOLITECP2,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Manganese,3.5,Ref. 22.,7210,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Mercury,4.94,Ref. 22.,13534,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Molybedenum,30.3,Ref. 22.,1028,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Nickel,12.4,Ref. 114.,8908,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Perlite - Expanded,0.52,Ref. 114.,90,5,Average from Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Perlite - Natural,0.03,Ref. 114.,1100,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Silver,6.31,Ref. 148.,1050,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Vanadium,228,Ref. 22.,6100,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Water,0.0008,None,1000,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Yttrium,84,Ref. 22.,4472,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Miscellaneous,Zirconium,97.2,Ref. 22.,6520,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Paper,Paperboard (General for construction use),1.29,"Excluding calorific value (CV) of wood, excludes carbon sequestration/biogenic carbon storage. Assumes kgCO2 = kgCO2e",480,5,Laminated paper value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Paper,Fine Paper,1.49,"Excluding CV of wood, excludes carbon sequestration.  Assumes kgCO2 = kgCO2e",480,5,Laminated paper value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Paper,Wallpaper,1.93,Assumes kgCO2 = kgCO2e,480,5,Laminated paper value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plaster,General (Gypsum),0.13,"Problems selecting good value, inconsistent figures, West et al believe this is because of past aggregation of EE with cement",1200,5,Gypsum value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Plaster,Plasterboard,0.39,"See Ref [WRAP] for further info on GWP data, including disposal impacts which are significant for Plasterboard.",950,22.5,Plasterboard value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Plastics,ABS,3.76,48.6 MJ/kg Feedstock Energy  (Included),1025,5,http://www.bpf.co.uk//plastipedia/polymers/ABS_and_Other_Specialist_Styrenics.aspx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,HDPE Pipe,2.52,55.1 MJ/kg Feedstock Energy  (Included),970,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,LDPE Film,2.6,55.2 MJ/kg Feedstock Energy (Included),930,15,From Wikipedia,WRAP,TRUE
ICE v2.0 2011 (UK),Plastics,Nylon (Polyamide) 6 Polymer,9.14,"38.6 MJ/kg Feedstock Energy  (Included). Doesn t include final fabrication. Plastics Europe state that two thirds of nylon is used as fibres (textiles, carpets etc) in Europe and that most of the remainder as injection mouldings. Dinitrogen monoxide and methane emissions are very significant contributors to GWP.",1150,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,"Nylon (polyamide) 6,6 Polymer",7.92,50.7 MJ/kg Feedstock Energy  (Included). Doesn t include final fabrication (i.e. injection moulding). See comments for Nylon 6 polymer.,1150,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,Polycarbonate,7.62,36.7 MJ/kg Feedstock Energy  (Included). Doesn t include final fabrication.,1200,5,https://www.ribaproductselector.com/Docs/4/09674/external/COL641227.pdf,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,"Polypropylene, Orientated Film",3.43,55.7 MJ/kg Feedstock Energy  (Included).,1175,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,"Polypropylene, Injection Moulding",4.49,"54 MJ/kg Feedstock Energy  (Included). If biomass benefits are included the CO2 may reduce to 3.85 kgCO2/kg, and GWP down to 4.41 kg CO2e/kg.",1175,5,From Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,Expanded Polystyrene,3.29,46.2 MJ/kg Feedstock Energy  (Included),35,5,https://www.ribaproductselector.com/Docs/1/02081/external/COL578974.pdf,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,General Purpose Polystyrene,3.43,46.3 MJ/kg Feedstock Energy  (Included),1050,5,http://www.bpf.co.uk/plastipedia/polymers/GPPS.aspx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,High Impact Polystyrene,3.42,46.4 MJ/kg Feedstock Energy  (Included),1045,5,http://www.bpf.co.uk/plastipedia/polymers/HIPS.aspx,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,Polyurethane Flexible Foam,4.84,33.47 MJ/kg Feedstock Energy  (Included). Poor data availability for feedstock energy,30,5,Polyurethane foam value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,Polyurethane Rigid Foam,4.26,37.07 MJ/kg Feedstock Energy  (Included). Poor data availability for feedstock energy,30,5,Polyurethane form value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,PVC General,3.1,28.1 MJ/kg Feedstock Energy  (Included). Based on market average consumption of types of PVC in the European construction industry,1380,5,Polyvinylchloride (PVC) value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,PVC Pipe,3.23,"24.4 MJ/kg Feedstock Energy  (Included). If biomass benefits are included the CO2 may reduce to 2.51 kgCO2/kg, and GWP down to 3.23 kg CO2e/kg.",1380,5,Polyvinylchloride (PVC) value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,Calendered Sheet PVC,3.19,"24.4 MJ/kg Feedstock Energy  (Included). If biomass benefits are included the CO2 may reduce to 2.56 kgCO2/kg, and GWP down to 3.15 kg CO2e/kg.",1380,5,Polyvinylchloride (PVC) value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,PVC Injection Moulding,3.3,"35.1 MJ/kg Feedstock Energy  (Included). If biomass benefits are included the CO2 may reduce to 2.23 kgCO2/kg, and GWP down to 2.84 kg CO2e/kg.",1380,5,Polyvinylchloride (PVC) value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Plastics,UPVC Film,3.16,25.3 MJ/kg Feedstock Energy  (Included),1380,5,Polyvinylchloride (PVC) value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Rubber,General,2.85,40 MJ/kg Feedstock Energy  (Included). Density value is general value from ICE database,1500,6,Rubber value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Sand,General,0.0051,Estimated from real UK industrial fuel consumption data,2240,5,Sand value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Steel,Stainless,6.145,World average data from the Institute of Stainless Steel Forum (ISSF) life cycle inventory data. Selected data is for the most popular grade (304). Stainless steel does not have separate primary and recycled material production routes.,8000,0,Stainless steel 20%Ni value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Stone,General ,0.079,"ICE database average (statistic), uncertain. See material profile.",2200,5,Assumed density,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Stone,Granite,0.7,Estimated from Ref 116.,2880,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Stone,Limestone,0.09,Estimated from Ref 188.,2180,10,From CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Stone,Marble,0.13,None,2500,3,From CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Stone,Marble tile,0.21,Ref. 40.,2500,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Stone,Sandstone,0.06,Uncertain estimate based on Ref. 262.,2200,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Stone,Shale,0.002,None,2700,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Stone,Slate,0.035,Large data range,1600,5,From CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Tin,Tin,14.47,"lack of modern data, large data range",7300,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Titanium,Virgin,31.55,"lack of modern data, large data range, small sample size",4506,5,Single value from Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Titanium,Recycled,14.7,"lack of modern data, large data range, small sample size",4506,5,Single value from Wikipedia,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Vinyl Flooring,General,3.19,"23.58 MJ/kg Feedstock Energy  (Included), Same value as PVC calendered sheet. Note: the book version of ICE contains the wrong values. These values are up to date",1200,5,Single value from CIBSE data,Assumed as 5% for baseline,TRUE
ICE v2.0 2011 (UK),Zinc,General,3.09,"Uncertain carbon estimates, currently estimated from typical UK industrial fuel mix. Recycled content of general Zinc 30%.",7000,5,Single value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Zinc,Virgin,4.18,None,7000,5,Single value from CIBSE data,WRAP,TRUE
ICE v2.0 2011 (UK),Zinc,Recycled,0.52,None,7000,5,Single value from CIBSE data,WRAP,TRUE
EPiC 2019 (AUS),Concrete,Concrete block,0.24,EPiC data,1400,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete block - 390 × 190 × 90 mm,0.2356,EPiC data,1400,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete block - 390 × 190 × 140 mm,0.1859,EPiC data,1400,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete block - 390 × 190 × 190 mm,0.1623,EPiC data,1400,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Cement,Cement mortar,0.35,EPiC data,1858,5,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Cement,Portland cement,1.3,EPiC data,1500,5,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,AAC block - 600 × 200 × 100 mm,0.7121,EPiC data,550,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,AAC block - 600 × 200 × 150 mm,0.7071,EPiC data,550,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,AAC block - 600 × 200 × 200 mm,0.7121,EPiC data,550,20,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Autoclaved aerated concrete (AAC),0.71,EPiC data,550,20,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Concrete,Concrete 20 MPa,0.1405,EPiC data,2335,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 20 MPa - 30% fly ash,0.1075,EPiC data,2335,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 20 MPa - 30% GGBFS,0.1126,EPiC data,2335,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 25 MPa,0.1499,EPiC data,2409,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 25 MPa - 30% fly ash,0.115,EPiC data,2409,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 25 MPa - 30% GGBFS,0.1216,EPiC data,2409,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 32 MPa,0.1788,EPiC data,2327,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 32 MPa - 30% fly ash,0.1349,EPiC data,2327,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 32 MPa - 30% GGBFS,0.1422,EPiC data,2327,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 40 MPa,0.2071,EPiC data,2400,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 40 MPa - 30% fly ash,0.1554,EPiC data,2400,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 40 MPa - 30% GGBFS,0.1633,EPiC data,2400,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 50 MPa,0.2573,EPiC data,2332,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 50 MPa - 30% fly ash,0.2003,EPiC data,2332,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Concrete,Concrete 50 MPa - 30% GGBFS,0.211,EPiC data,2332,4,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Fibre Cement,FC weatherboard - 150 × 16 mm - per m² wall,2.0285,EPiC data,1445,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,FC weatherboard - 180 × 16 mm - per m² wall,2.0285,EPiC data,1445,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,FC weatherboard - 205 × 7.5 mm - per m² wall,2.3991,EPiC data,1445,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,FC weatherboard - 230 × 7.5 mm - per m² wall,2.233,EPiC data,1445,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,FC weatherboard - 300 × 7.5 mm - per m² wall,2.3253,EPiC data,1445,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,sheet,1.6,EPiC data,1445,8,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Fibre Cement,sheet - 4.5 mm,1.5686,EPiC data,1445,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,sheet - 6 mm,1.5571,EPiC data,1445,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,sheet - 7.5 mm,1.5594,EPiC data,1445,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,sheet - 18 mm,1.5609,EPiC data,1445,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,sheet - 24 mm,1.5629,EPiC data,1445,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Fibre Cement,weatherboard,2.2,EPiC data,1445,8,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Plaster,Gypsum plaster,0.44,EPiC data,1956,5,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plaster,Plasterboard - 10 mm,1.0175,EPiC data,570,5,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Plaster,Plasterboard - 13 mm,0.8772,EPiC data,570,5,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Tiles,Concrete roof tile,0.39,EPiC data,2100,8,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Double glazing - flat,4.8558,EPiC data,2600,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Glass,"Double glazing - flat, 4:12:4",4.8558,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - flat, 6:6:6",3.4615,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - flat, 6:12:6",3.4615,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat,2,EPiC data,2600,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Glass,Flat sheet - 3 mm,2.0128,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat sheet - 4 mm,2.0192,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat sheet - 5 mm,2.0154,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat sheet - 6 mm,2.0128,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat sheet - 10 mm,2.0154,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Flat sheet - 12 mm,2.016,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Laminated,2.8,EPiC data,2600,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Glass,Laminated sheet - 6.38 mm,2.8213,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Laminated sheet - 8.38 mm,2.8181,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Laminated sheet - 10.38 mm,2.8198,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Laminated sheet - 12.38 mm,2.8178,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Double glazing - toughened,4.4231,EPiC data,2600,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 4:12:4",5.5288,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 5:6:5",4.6923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 5:12:5",4.6923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 6:6:6",4.1026,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 6:12:6",4.1026,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 10:6:6",3.9663,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 10:6:10",3.8846,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 10:12:6",3.9663,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,"Double glazing - toughened, 10:12:10",3.8846,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened,2.2,EPiC data,2600,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Glass,Toughened sheet - 3 mm,2.1923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened sheet - 4 mm,2.1923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened sheet - 5 mm,2.1923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened sheet - 6 mm,2.1923,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened sheet - 10 mm,2.1885,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Glass,Toughened sheet - 12 mm,2.1891,EPiC data,2600,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Cellulose insulation,0.79,EPiC data,50,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Cellulose insulation - 80 mm (R2),0.775,EPiC data,50,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Cellulose insulation - 100 mm (R2.5),0.78,EPiC data,50,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Aluminium foil insulation,0.5919,EPiC data,321,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Glasswool insulation,4,EPiC data,25,15,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Insulation,Glasswool insulation - 80 mm (R2),4,EPiC data,25,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Glasswool insulation - 100 mm (R2.5),4.04,EPiC data,25,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Rockwool insulation,3.8,EPiC data,70,15,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Insulation,Rockwool insulation - 80 mm (R2),3.7679,EPiC data,70,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Rockwool insulation - 100 mm (R2.5),3.7714,EPiC data,70,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,EPS/XPS insulation - 72 mm (R2),7.7899,EPiC data,23,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,EPS/XPS insulation - 90 mm (R2.5),7.8261,EPiC data,23,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Polystyrene (EPS/XPS) insulation,8,EPiC data,23,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,Polyurethane (PU) rigid foam insulation,17.5,EPiC data,30,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,PU rigid foam insulation - 44 mm (R2),17.5,EPiC data,30,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Insulation,PU rigid foam insulation - 55 mm (R2.5),17.4545,EPiC data,30,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,angle extruded,32.7,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar,29.6,EPiC data,2712,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Aluminimum,bar flat - 12 mm × 3mm,29.7034,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar flat - 40 mm × 3mm,29.4985,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar flat - 100 mm × 6mm,29.6214,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar round - 16 mm dia.,29.7095,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar round - 50 mm dia.,29.6714,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,bar round - 150 mm dia.,29.6296,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,composite panel,0.3761,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,extruded,29.4,EPiC data,1900,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Aluminimum,extruded powdercoated,33.6,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"round tube - 25 mm dia., 3.2 mm thick",15.8155,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"round tube - 60 mm dia., 10 mm thick",16.784,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"round tube - 80 mm dia., 6 mm thick",15.2794,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,sheet,26.7,EPiC data,2712,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Aluminimum,sheet - 1.6 mm,26.733,EPiC data,2712,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,sheet - 3 mm,26.6716,EPiC data,2712,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,sheet - 6 mm,26.6716,EPiC data,2712,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"square tube - 20 × 20 mm, 1.6 mm thick",15.3429,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"square tube - 40 × 40 mm, 2 mm thick",15.0404,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aluminimum,"square tube - 100 × 100 mm, 3 mm thick",14.9203,EPiC data,2712,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,pipe,10.1,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,"pipe - 12.7 mm outer dia., 0.91 mm thick",9.9559,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,"pipe - 19.05 mm outer dia., 1.02 mm thick",10.0675,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,"pipe - 40 mm outer dia., 1.22 mm thick",10.0844,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,sheet,15.1,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,sheet - 0.9 mm,15.0385,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,sheet - 1.2 mm,15.1007,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,sheet - 2 mm,15.1007,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,sheet - 3 mm,15.1007,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Copper,wire,41.8,EPiC data,8940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Bare wire - 2 mm dia.,139.826,EPiC data,774,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Bare wire - 3.2 mm dia.,13.9762,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Cold rolled stainless steel,9.2,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,extruded,11.8,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,sheet,7.2,EPiC data,7740,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Stainless Steel,sheet products,14.7,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,wire,13.9,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Wire Rope - 1.6 mm dia.,9.6387,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Wire Rope - 4 mm dia.,8.9448,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Wire Rope - 8 mm dia.,9.2532,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stainless Steel,Wire Rope - 12 mm dia.,8.9105,EPiC data,7740,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,Cold rolled,3.7,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,Hot rolled galvanised structural,3.3,EPiC data,7850,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,Hot rolled structural,2.9,EPiC data,7850,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,"Square tube - 20 × 20 mm, 1.6 mm thick",4.9761,EPiC data,7850,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,"Square tube - 50 × 50 mm, 2 mm thick",4.8102,EPiC data,7850,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,"Square tube - 100 × 100 mm, 4 mm thick",4.7937,EPiC data,7850,1,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,bar,2.1,EPiC data,7850,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,hollow section extruded,4.6,EPiC data,7850,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,pipe,3.5,EPiC data,7850,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,"pipe - 21.3 mm outer dia., 2.6 mm thick",3.5028,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,"pipe - 42.4 mm outer dia., 2.6 mm thick",3.5267,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,"pipe - 88.9 mm outer dia., 4 mm thick",3.5302,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,"pipe - 165.1 mm outer dia., 4.9 mm thick",3.5384,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,reinforcement bar - 6 mm dia.,2.8835,EPiC data,7850,10,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,reinforcement bar - 8 mm dia.,2.7877,EPiC data,7850,10,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,reinforcement bar - 12 mm dia.,2.9285,EPiC data,7850,10,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,sheet corrugated,5.5,EPiC data,7850,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Steel,sheet corrugated colorbond,1.586,EPiC data,7850,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Steel,sheet corrugated - per square metre,1.1401,EPiC data,7850,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Asphalt,General,0.2,EPiC data,2649,15,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,Nylon carpet,8.9143,EPiC data,350,20,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Tufted carpet, nylon - prestige",15.8,EPiC data,350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Tufted carpet, nylon - quality",9.5143,EPiC data,350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Tufted carpet, wool - prestige",12.1132,EPiC data,530,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Tufted carpet, wool - quality",9.2642,EPiC data,530,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,Wool carpet,7.7358,EPiC data,530,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Woven carpet, nylon - average",4.5094,EPiC data,530,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Carpet,"Woven carpet, nylon - quality",7.0857,EPiC data,350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Other,Silicone,13.8,EPiC data,0.96,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Other,Water,0.001,EPiC data,1000,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Other,Wood glue (PVA),5.4,EPiC data,1191,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paint,Solvent-based paint,6.3,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paint,Solvent-based paint - per m²,0.47,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paint,Water-based paint,6.8,EPiC data,1250,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paint,Water-based paint - per m²,0.53,EPiC data,1250,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paper,Wallpaper,16,EPiC data,920,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Paper,Wallpaper - per m²,2.8,EPiC data,920,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Rubber,Natural rubber,2.5,EPiC data,1100,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Rubber,Synthetic rubber,3.7,EPiC data,1100,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,HDPE film - 100 ?m,6.383,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,HDPE film - 200 ?m,6.383,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 32 mm inner dia., 1.88 mm thickness",3.0499,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 63 mm inner dia., 3.75 mm thickness",3.0481,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 125 mm inner dia., 7.35 mm thickness",3.0545,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 250 mm inner dia., 14.71 mm thickness",3.033,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 500 mm inner dia., 29.41 mm thickness",3.0339,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"HDPE pipe - 800 mm inner dia., 47.06 mm thickness",0.6947,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,High-density polyethylene (HDPE) film,6.4,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,High-density polyethylene (HDPE) pipe,5.6,EPiC data,940,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,LDPE film - 100 ?m,6.3736,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,LDPE film - 200 ?m,6.5934,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"LDPE pipe - 13 mm inner dia., 3.95 mm thickness",4.9904,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"LDPE pipe - 19 mm inner dia., 4.4 mm thickness",4.3561,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"LDPE pipe - 25 mm inner dia., 5.2 mm thickness",4.0768,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"LDPE pipe - 32 mm inner dia., 6.7 mm thickness",4.1271,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Low-density polyethylene (LDPE) film,6.4,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Low-density polyethylene (LDPE) pipe,6,EPiC data,910,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Nylon 66,22.2,EPiC data,1140,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Nylon 66 sheet - 1.5 mm,22.1637,EPiC data,1140,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Nylon 66 sheet - 3 mm,22.1637,EPiC data,1140,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Nylon 66 sheet - 5 mm,22.1053,EPiC data,1140,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,ABS panel - 2mm,16028.0374,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,ABS panel - 3mm,16012.4611,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"ABS pipe - 21.4 mm outer dia., 2.1 mm thick",16147.7652,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"ABS pipe - 48.3 mm outer dia., 3.6 mm thick",16083.3154,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"ABS pipe - 168.3 mm outer dia., 7.7 mm thick",16021.542,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Acrylonitrile butadiene styrene (ABS),16,EPiC data,1.07,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,ETFE film - 25.4 ?m (0.001”),475.7441,EPiC data,1700,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,ETFE film - 50.8 ?m (0.002”),468.9671,EPiC data,1700,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,ETFE film - 127 ?m (0.005”),467.8092,EPiC data,1700,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Ethylene tetrafluoroethylene (ETFE),798,EPiC data,1700,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Glass reinforced plastic (GRP),18.8,EPiC data,1350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,GRP panel - 10 mm,18.8148,EPiC data,1350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,GRP panel - 20 mm,18.8519,EPiC data,1350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,GRP panel - 50 mm,18.8296,EPiC data,1350,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Linoleum,4.4,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Linoleum sheet - 2 mm,4.4167,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Linoleum sheet - 2.5 mm,4.4333,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Linoleum sheet - 3.2 mm,4.4271,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Linoleum sheet - 4 mm,4.4167,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polycarbonate,14,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polycarbonate roofing sheet - 1 mm,13.9167,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polycarbonate roofing sheet - 2 mm,13.9583,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polycarbonate roofing sheet - 3 mm,13.9444,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polycarbonate roofing sheet - 6 mm,13.8889,EPiC data,1200,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polymethyl methacrylate (PMMA),15.4,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 3 mm,15.3782,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 4 mm,15.3782,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 5 mm,15.3613,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 6 mm,15.4062,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 8 mm,15.3361,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PMMA sheet - 10 mm,15.3782,EPiC data,1190,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polypropylene (PP) sheet,7.4,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 2 mm,7.4444,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 3 mm,7.4074,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 4 mm,7.4167,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 6 mm,7.4259,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 10 mm,7.4222,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 12 mm,7.4259,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PP sheet - 15 mm,7.4074,EPiC data,900,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polyurethane (PU) flexible foam,7.7,EPiC data,69,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"PU foam underlay - 7 mm, 64 kg/m³",7.5893,EPiC data,64,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"PU foam underlay - 7 mm, 69 kg/m³",7.6605,EPiC data,69,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"PU foam underlay - 10 mm, 73 kg/m³",7.6712,EPiC data,73,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"PU foam underlay - 10 mm, 123 kg/m³",7.6423,EPiC data,123,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Polyvinyl chloride (PVC) film,11.2,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PVC film - 19 ?m,11.3593,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,PVC film - 25 ?m,11.223,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,Unplasticised polyvinyl chloride (uPVC),4.2,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"uPVC pipe - 21.35 mm outer dia., 1.8 mm thick",4.1648,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"uPVC pipe - 60.25 mm outer dia., 2.6 mm thick",4.125,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"uPVC pipe - 114.3 mm outer dia., 4.85 mm thick",4.1846,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Plastic,"uPVC pipe - 225.3 mm outer dia., 11.1 mm thick",4.1608,EPiC data,1390,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Ceramic,Clay brick,0.32,EPiC data,2403,8,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Stone,Gravel,0.036,EPiC data,1840,10,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Aggregate,Recycled,0.008,EPiC data,1320,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Sand,General,0.024,EPiC data,1500,12.5,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Ceramic,Sanitary,6.4,EPiC data,2700,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Stone,Dimension stone,1.3,EPiC data,2243,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Ceramic,Tile,1.3,EPiC data,2900,8,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Ceramic,Clay roof tile,0.61,EPiC data,1860,8,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Cork slab,9.5,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cork slab - 6 mm,9.4444,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cork slab - 10 mm,9.5,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cork slab - 12 mm,9.4444,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cork slab - 20 mm,9.4583,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cork slab - 50 mm,9.4667,EPiC data,120,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Hardwood,1.3111,EPiC data,720,5,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Hardwood kiln-dried - dressed,3.1514,EPiC data,720,5,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Hardwood kiln-dried - structural,1.6361,EPiC data,720,5,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,"Hardwood (Rough-sawn, Kiln Dried) - No Carbon Storage",0.452,"Wood Solution EPD, Section 2",735,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,"Hardwood (Rough-sawn, Kiln Dried) - With Carbon Storage",-1.208,"Wood Solution EPD, Section 2",735,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,"Hardwood (Dressed, Kiln Dried) - No Carbon Storage",0.665,"Wood Solution EPD, Section 2",735,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,"Hardwood (Dressed, Kiln Dried) - With Carbon Storage",-0.995,"Wood Solution EPD, Section 2",735,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,"Hardwood (Rough-sawn, Green) - No Carbon Storage",0.48,"Wood Solution EPD, Section 2",768,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,"Hardwood (Rough-sawn, Green) - With Carbon Storage",-1.108,"Wood Solution EPD, Section 2",768,5,"Wood Solution EPD, Section 2",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,CLT - 60 mm,0.079,EPiC data,490,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,CLT - 105 mm,0.1382,EPiC data,490,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,CLT - 175 mm,0.2306,EPiC data,490,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Cross laminated timber (CLT),1.3163,EPiC data,490,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Cross laminated timber (CLT) - No Carbon Storage,0.437,ICE v3.0b 2019,490,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Glued laminated timber (glulam),3.9953,EPiC data,430,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Glulam (Softwood) - No Carbon Storage,0.653,"Wood Solution EPD, Section 6",620,0,"Wood Solution EPD, Section 6",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Glulam (Softwood) - With Carbon Storage,-0.987,"Wood Solution EPD, Section 6",620,0,"Wood Solution EPD, Section 6",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Glulam (Hardwood) - No Carbon Storage,0.85,"Wood Solution EPD, Section 6",673,0,"Wood Solution EPD, Section 6",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Glulam (Hardwood) - With Carbon Storage,-0.606,"Wood Solution EPD, Section 6",673,0,"Wood Solution EPD, Section 6",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Glulam outdoor,3.7326,EPiC data,430,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Laminated veneer lumber (LVL),2.0765,EPiC data,510,0,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Laminated veneer lumber (LVL),0.504,ICE v3.0b 2019,510,0,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,MDF sheet,1.3143,EPiC data,684,1,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Melamine-coated MDF board - 16 mm,1.7087,EPiC data,684,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Melamine-coated MDF board - 18 mm,1.73,EPiC data,684,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Melamine-coated MDF board - 25 mm,1.7836,EPiC data,684,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,OSB sheet,1.2372,EPiC data,607,10,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Particleboard,1.0235,EPiC data,680,10,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Particleboard outdoor,1.1956,EPiC data,680,10,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Plywood,5.888,EPiC data,625,10,Value from EPiC data,WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Plywood outdoor,2.8432,EPiC data,625,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,SIP - 142 mm,8.6635,EPiC data,139,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,SIP - 162 mm,8.6597,EPiC data,139,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Structural insulated panel (SIP),9.7122,EPiC data,139,,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber,Softwood,1.0765,EPiC data,510,10,Value from EPiC data,WRAP Data,FALSE
EPiC 2019 (AUS),Timber ,"Softwood (Sawn, Kiln-Dried) - No Carbon Storage",0.254,"Wood Solution EPD, Section 1",551,10,"Wood Solution EPD, Section 1",WRAP Data,TRUE
EPiC 2019 (AUS),Timber ,"Softwood (Sawn, Kiln-Dried) - With Carbon Storage",-1.379,"Wood Solution EPD, Section 1",551,10,"Wood Solution EPD, Section 1",WRAP Data,TRUE
EPiC 2019 (AUS),Timber ,"Softwood (Dressed, Kiln-Dried) - No Carbon Storage",0.365,"Wood Solution EPD, Section 1",551,10,"Wood Solution EPD, Section 1",WRAP Data,TRUE
EPiC 2019 (AUS),Timber ,"Softwood (Dressed, Kiln-Dried) - With Carbon Storage",-1.269,"Wood Solution EPD, Section 1",551,10,"Wood Solution EPD, Section 1",WRAP Data,TRUE
EPiC 2019 (AUS),Timber,Softwood kiln-dried,1.1431,EPiC data,510,10,Value from EPiC data,WRAP Data,FALSE
EPD,Steel,S275JR and S355JR Non-alloy structural steel (Emirates Steel Company LLC 2016),2.56,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Steel,Galvanized Pipe (UAE) (Conares Metal Supply Ltd. 2019),2.2616,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Concrete,C30 - C35 (66%GGBS) (NRMCA Dubai Municipality 2017),0.0926,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C40 (36%GGBS) (NRMCA Dubai Municipality 2017),0.1368,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C40 (66%GGBS) (NRMCA Dubai Municipality 2017),0.0979,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C45 (36%GGBS) (NRMCA Dubai Municipality 2017),0.1392,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C45 (66%GGBS) (NRMCA Dubai Municipality 2017),0.1012,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C50 (36%GGBS) (NRMCA Dubai Municipality 2017),0.142,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C55 (26%GGBS+5%MS) (NRMCA Dubai Municipality 2017),0.1533,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C60 (26%GGBS+5%MS) (NRMCA Dubai Municipality 2017),0.1558,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C65 (26%GGBS+6%MS) (NRMCA Dubai Municipality 2017),0.1545,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C70 (26%GGBS+7%MS) (NRMCA Dubai Municipality 2017),0.1554,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C75 (26%GGBS+7%MS) (NRMCA Dubai Municipality 2017),0.1582,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C80 (26%GGBS+8%MS) (NRMCA Dubai Municipality 2017),0.1602,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C90 (26%GGBS+8%MS) (NRMCA Dubai Municipality 2017),0.1646,taken from EPD,2400,4,from EPD,WRAP,TRUE
EPD,Concrete,C18 and C20 D11540 OPC + GGBS 40% (Transgulf Readymix 2010),0.1003,taken from EPD,2493,4,from EPD,WRAP,TRUE
EPD,Concrete,C30 and C35 D09546 OPC + GGBS 66% (Transgulf Readymix 2010),0.0933,taken from EPD,2485,4,from EPD,WRAP,TRUE
EPD,Concrete,C45 D09695 OPC + GGBS 66% (Transgulf Readymix 2010),0.1011,taken from EPD,2489,4,from EPD,WRAP,TRUE
EPD,Concrete,C60 D11842 OPC + GGBS 45% +MS 5% (Transgulf Readymix 2010),0.14,taken from EPD,2461.5,4,from EPD,WRAP,TRUE
EPD,Concrete,C37 and C40 D11485 OPC + GGBS 66% (Transgulf Readymix 2010),0.0973,taken from EPD,2480.5,4,from EPD,WRAP,TRUE
EPD,Concrete,C45 and C50 D11486 OPC + GGBS 50% (Transgulf Readymix 2010),0.1265,taken from EPD,2506,4,from EPD,WRAP,TRUE
EPD,Concrete,C45 and C50 D11539 OPC + GGBS 50% (Transgulf Readymix 2010),0.1296,taken from EPD,2490,4,from EPD,WRAP,TRUE
EPD,Concrete,C40 D09885 OPC + GGBS 50% (Transgulf Readymix 2010),0.1244,taken from EPD,2490.5,4,from EPD,WRAP,TRUE
EPD,Concrete,C50 D11471 OPC + GGBS 66% (Transgulf Readymix 2010),0.1025,taken from EPD,2496,4,from EPD,WRAP,TRUE
EPD,Steel,Carbon Steel Reinforcing Bars (Union Iron & Steel Company LLC 2018),0.891,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Steel,Carbon Steel Reinforcing Bars (Hamriyah Steel FZC 2020),0.954,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Steel,Carbon Steel Reinforcing Bars (Conares Metal Supply Ltd. 2018),0.96,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Steel,Carbon Steel Reinforcing Bars (Qatar Steel Company FZE 2020),1.12,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Composite,Floor Deck Comflor 60 1.0mm (Tata Steel International ME ZFE),2.75,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Composite,Floor Deck Comflor 51+ 1.2mm (Tata Steel International ME ZFE),2.90,taken from EPD,7850,0,from EPD,WRAP,TRUE
EPD,Cement,General (INSEE Easy Flow Vietnam 2020),0.848,taken from EPD,1600,5,assumed average value,WRAP,TRUE
Netherlands,Fill materials,EPS (NMD),0.2464,NMD (Netherlands),20,0,from EPD,None,TRUE
Netherlands,Steel,Stainless Steel (RVS) NL (NMD),5.0733,NMD (Netherlands),7850,0,from EPD,None,TRUE
Netherlands,Aluminium,Aluminium General (NMD),4.4897,NMD (Netherlands),2755,0,from EPD,None,TRUE
Netherlands,Bricks,Brick (NMD),0.2443,NMD (Netherlands),1822,0,from EPD,None,TRUE
Netherlands,Glass,Double glazing (NMD),1.1307,NMD (Netherlands),1823,0,from EPD,None,TRUE
Netherlands,Coating,Powdercoat steel (NMD),15.8,NMD (Netherlands),1824,0,from EPD,None,TRUE
Netherlands,Coating,Powdercoat Aluminium (NMD),16.2,NMD (Netherlands),1826,0,from EPD,None,TRUE
Netherlands,Concrete,In-situ Concrete with Rebar average NL value (NL average value),0.115,CE Delft - Milieu-impact van betongebruik in de Nederlandse bouw,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,Precast Concrete with Rebar average NL value (NL average value),0.149,CE Delft - Milieu-impact van betongebruik in de Nederlandse bouw,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C30/37 100% CEM1 (NL sus. generated),0.111,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C30/37 75% CEM1 25% CEMIII//C (NL sus. generated),0.096,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C30/37 50% CEM1 50% CEMIII/C (NL sus. generated),0.078,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C30/37 25% CEM1 75% CEMIII/C (NL sus. generated),0.057,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C40/50 100% CEM1 (NL sus. generated),0.141,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C40/50 75% CEM1 25% CEMIII/C (NL sus. generated),0.121,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C40/50 50% CEM1 50% CEMIII/C (NL sus. generated),0.099,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C40/50 25% CEM1 75% CEMIII/C (NL sus. generated),0.072,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C50/60 100% CEM1 (NL sus. generated),0.177,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C50/60 75% CEM1 25% CEMIII/C (NL sus. generated),0.155,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C50/60 50% CEM1 50% CEMIII/C (NL sus. generated),0.125,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,C50/60 25% CEM1 75% CEMIII/C (NL sus. generated),0.089,Sus. Domain Generated from MRPI Cement Data,2400,4,from EPD,WRAP,TRUE
Netherlands,Concrete,Breedplaatvloer incl wapening - precast only (EPD),0.1917,NMD (Netherlands) - SBK442,2400,0,from EPD,None,TRUE
Netherlands,Concrete,150mm Kanaalplaatvloer - 268kg/m2 (EPD),0.1401,VBI Consolis EPD,1787,3,from EPD,From EPD,TRUE
Netherlands,Concrete,200mm Kanaalplaatvloer - 308kg/m2 (EPD),0.1383,VBI Consolis EPD,1540,3,from EPD,From EPD,TRUE
Netherlands,Concrete,260mm Kanaalplaatvloer - 383kg/m2 (EPD),0.1471,VBI Consolis EPD,1473,3,from EPD,From EPD,TRUE
Netherlands,Concrete,320mm Kanaalplaatvloer - 429kg/m2 (EPD),0.1618,VBI Consolis EPD,1341,3,from EPD,From EPD,TRUE
Netherlands,Concrete,400mm Kanaalplaatvloer - 490kg/m2 (EPD),0.1603,VBI Consolis EPD,1225,3,from EPD,From EPD,TRUE
Netherlands,Steel,Rolled European Sections (90%EAF+10%BF) (NMD),0.908,"""Bouwen met staal"" (MRPI) - Heavy construction Products",7850,0,from EPD,None,TRUE
Netherlands,Steel,Structural Hollow Sections (TATA) (EPD),2.5,Tata Steel - Structural Hollow sections EPD,7850,0,from EPD,None,TRUE
Netherlands,Steel,Reinforcement NL average (EPD),1.36,Vereniging Wapeningsstaal Nederland MRPI EPD,7850,5,from EPD,WRAP,TRUE
Netherlands,Steel,Comflor metal Decking (EPD),2.66,Tata Steel - Comflor EPD's averaged (51/60/80),7850,1,from EPD,WRAP,TRUE
Netherlands,Timber,Average Engineered Timber product (CLT/Glulam) - No Carbon storage (EPD),0.32,Averaged from CLT/Glulam & LVL EPD's,496,5,from EPD,Back calculated from EPD A5 value,TRUE
Netherlands,Timber,CLT NL (C24 Spruce)- No Carbon Storage (EPD),0.3239,Derix X-LAM CLT 2019 EPD Spruce,470,5,from EPD,Back calculated from EPD A5 value,TRUE
Netherlands,Timber,"Glulam NL (GL24h, GL28c and GL32c) No Carbon Storage (EPD)",0.32,Studiengemeinschaft Holzleimbau EPD Glulam without 811kg/m3 biogenic carbon,509,5,from EPD,WRAP,TRUE
Netherlands,Timber,LVL NL - No Carbon Storage (EPD),0.64,Kerto LVL EPD 2015 no biognenic,510,5,from EPD,WRAP,TRUE
Netherlands,Timber,Planed Timber EU Strength Graded No Carbon Storage (EPD),0.0872,Stora Enso Classic Planed Timber EPD 2020,460,10,from EPD,WRAP,TRUE
CLCD (China),Aluminium,Sheet,28.5,from GB-T51366-2019,2700,0,from GB 50009-2012,WRAP,TRUE
CLCD (China),Aluminium,Electrolystic,20.3,from GB-T51366-2019,2700,1,from GB 50009-2013,WRAP,TRUE
CLCD (China),Brick,Hollow - General,0.227,from GB-T51366-2019,1000,20,from GB 50009-2014,WRAP,TRUE
CLCD (China),Brick,Solid - General,0.23,from GB-T51366-2019,1485,20,from GB 50009-2015,WRAP,TRUE
CLCD (China),Concrete,In-situ - C30,0.124,from GB-T51366-2019,2350,5,from GB 50009-2016,WRAP,TRUE
CLCD (China),Concrete,In-situ - C40,0.14,from GB-T51366-2019,2350,5,from GB 50009-2017,WRAP,TRUE
CLCD (China),Concrete ,In-situ - C50,0.162,from GB-T51366-2019,2350,5,from GB 50009-2018,WRAP,TRUE
Research (China),Concrete,In-situ - C60,0.171,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2019,WRAP,TRUE
Research (China),Concrete,In-situ - C70,0.186,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2020,WRAP,TRUE
Research (China),Concrete,In-situ - C80,0.2,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2021,WRAP,TRUE
Research (China),Concrete,In-situ - 35% Fly Ash - C30,0.085,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2022,WRAP,TRUE
Research (China),Concrete,In-situ - 35% Fly Ash - C40,0.097,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2023,WRAP,TRUE
Research (China),Concrete ,In-situ - 35% Fly Ash - C50,0.113,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2024,WRAP,TRUE
Research (China),Concrete,In-situ - 35% Fly Ash - C60,0.115,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2025,WRAP,TRUE
Research (China),Concrete,In-situ - 35% Fly Ash - C70,0.125,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2026,WRAP,TRUE
Research (China),Concrete,In-situ - 35% Fly Ash - C80,0.135,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2027,WRAP,TRUE
Research (China),Concrete,In-situ - 75% GGBS - C30,0.046,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2028,WRAP,TRUE
Research (China),Concrete,In-situ - 75% GGBS - C40,0.051,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2029,WRAP,TRUE
Research (China),Concrete ,In-situ - 75% GGBS - C50,0.055,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2030,WRAP,TRUE
Research (China),Concrete,In-situ - 75% GGBS - C60,0.06,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2031,WRAP,TRUE
Research (China),Concrete,In-situ - 75% GGBS - C70,0.065,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2032,WRAP,TRUE
Research (China),Concrete,In-situ - 75% GGBS -C80,0.069,from Paper Developing a CO2-e accounting method for quantification and analysis of embodied carbon in high-rise buildings,2350,5,from GB 50009-2033,WRAP,TRUE
Research (China),Concrete,Precast - C30,0.11,from Paper measurement of carbon footprint of precast concrete,2400,1,from GB 50009-2034,WRAP,TRUE
Research (China),Concrete,Precast - C40,0.125,from Paper Comparing carbon emission of precast and cast-in-situ construction methods,2400,1,from GB 50009-2035,WRAP,TRUE
Research (China),Concrete,Precast - C50 ,0.144,from Paper Comparing carbon emission of precast and cast-in-situ construction methods,2400,1,from GB 50009-2036,WRAP,TRUE
CLCD (China),Glass,General,1.13,from GB-T51366-2019,2500,5,from GB 50009-2037,WRAP,TRUE
CLCD (China),Insulation,Rock wool,1.98,from GB-T51366-2019,10,15,from GB 50009-2038,WRAP,TRUE
CLCD (China),Insulation,Expanded polystyrene ,4.62,from GB-T51366-2019,15,15,from GB 50009-2039,WRAP,TRUE
CLCD (China),Insulation,PUR/polyurethane,5.22,from GB-T51366-2019,30,15,from GB 50009-2040,WRAP,TRUE
CLCD (China),Plaster,Gypsum,0.0328,from GB-T51366-2019,850,5,from GB 50009-2041,WRAP,TRUE
CLCD (China),Steel,Carbon Steel Mixing,1.97,from GB-T51366-2019,7850,3,from GB 50009-2042,WRAP,TRUE
CLCD (China),Steel,Hot-rolled carbon steel H steel,2.35,from GB-T51366-2019,7850,3,from GB 50009-2043,WRAP,TRUE
CLCD (China),Steel,Thick plate in hot-rolled carbon steel,2.4,from GB-T51366-2019,7850,3,from GB 50009-2044,WRAP,TRUE
CLCD (China),Steel,Structural Hot-rolled seamless pipe sections,3.15,from GB-T51366-2019,7850,3,from GB 50009-2045,WRAP,TRUE
CLCD (China),Steel,Cold-rolled cold-pull carbon steel seamless steel pipe,3.68,from GB-T51366-2019,7850,3,from GB 50009-2046,WRAP,TRUE
EPD,Steel,Hollow Sections Q235 (Tianjin Yuantai China 2019),2.037,from EPD Tianjin China 2019,7850,3,from GB 50009-2047,WRAP,TRUE
EPD,Steel,Hollow Sections Q235 (Tianjin Yuantai China 2019),2.284,from EPD Tianjin China 2019,7850,3,from GB 50009-2048,WRAP,TRUE
EPD,Steel,Hollow Sections Q235 (Tianjin Yuantai China 2019),2.463,from EPD Tianjin China 2019,7850,3,from GB 50009-2049,WRAP,TRUE
EPD,Steel,Hollow Sections Q235 (Tianjin Yuantai China 2019),2.417,from EPD Tianjin China 2019,7850,3,from GB 50009-2050,WRAP,TRUE
Research (China),Steel,Recycled Scrap Steel -EAF,0.91,from Chinese Paper 2020,7850,3,from GB 50009-2047,WRAP,TRUE
CLCD (China),Steel,Reinforcement,2.34,from GB-T51366-2019,7850,5,from GB 50009-2048,WRAP,TRUE
CLCD (China),Steel,Hot-dip Galvanised  Profiled Sheet,3.11,from GB-T51366-2019,7850,1,from GB 50009-2049,WRAP,TRUE
CLCD (China),Steel,Electro-Galvanised Profiled Sheet,3.02,from GB-T51366-2019,7850,1,from GB 50009-2050,WRAP,TRUE
CLCD (China),Lime,General,1.19,from GB-T51366-2019,2500,10,from GB 50009-2051,WRAP,TRUE
CLCD (China),Plastic,Polyethylene film (for vapour barrier),2.81,from GB-T51366-2019,935,15,from GB 50009-2052,WRAP,TRUE
`;
export default MaterialDb;
