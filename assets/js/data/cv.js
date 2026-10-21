/* CV DATA. Jekyll equivalent: _data/cv.yml (sections: experience, education, hobbies)
   Entry = [dates, title, organisation, one-liner, { details:[], skills:[ids], projects:[ids] }] */
const EXP = [
  ["2022–2026","PhD researcher, soft actuation","BioRobotics Institute, Scuola Superiore Sant'Anna, Pisa","Design rules for soft pneumatic actuators.",
    {details:["Clinical constraints of minimally invasive surgery translated into system specifications.","Static and dynamic FEA in Ansys; hyperelastic material identification.","Fabrication pipeline from CAD and mold design to silicone molding.","Two closed-loop instrumented rigs (fluidic and thermal).","Co-supervised MSc theses."],
     skills:["mechanical","fea","prototyping","molding","testrigs","python"], projects:["phd"]}],
  ["2025–2026","Visiting researcher, fluidic logic","Oxford Robotics Institute","Electronics-free fluidic switching.",
    {details:["Bistable valves using PolyJet multi-material properties.","Toolbox from Boolean logic to 3D-printable geometry."],
     skills:["fluidic","prototyping","cad"], projects:["valves"]}],
  ["2022","Research engineer intern","GIPSA-lab, Grenoble","Fluidic actuator for an artificial larynx.",
    {details:["Designed, fabricated and characterised the prototype through iterative prototyping."],
     skills:["prototyping","medical","fluidic"], projects:["larynx"]}],
  ["2021–2022","Mechanical engineer intern","PKVitality, Paris","K'watch glucose-monitoring wearable.",
    {details:["Mechanical design under biocompatibility constraints.","Design validation with clinician and end-user feedback."],
     skills:["mechanical","cad","medical","dfm"], projects:["kwatch"]}]
];

const EDU = [
  ["2017–2022","Engineering degree, mechanical design + MSc mechatronics","Université de Technologie de Compiègne","GPA 4.66/5.",
    {details:["Core: mechanical design, tolerancing, FEA, mechatronics.","Minor in philosophy, technology and cognition.","Erasmus exchange, TU Hamburg (2021).","Equipment manager at FabLab UTC."],
     skills:["mechanical","cad","fea"], projects:[]}],
  ["2024","BEST summer school, 1st prize","IHU Strasbourg","Business, engineering and surgical technologies.",
    {details:["Deployable endoscopic device concept for endometriosis screening; won the team competition."],
     skills:["medical","mechanical"], projects:[]}],
  ["2023","Summer school on surgical robotics","LIRMM, Montpellier","Surgical robotics methods and systems.",
    {details:["Add what you covered or built there."], skills:["medical"], projects:[]}]
];

/* [title, description] */
const HOB = [
  ["CanSat lead referee","ESA/ESERO student competition, 2020–2026."],
  ["Soft Robotics Newsletter","Co-manager."],
  ["FabLab UTC","Equipment manager and trainer, 2019–2022."],
  ["Sports","Mountaineering, running"],
  ["Crafts","3D printing, crochet, painting, photography"],
];
