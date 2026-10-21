PROJ.push({
  id:"origami", title:"Origami chambers", when:"2023–2026", color:"#6F8F8A",
  skills:["mechanical","fea","prototyping","molding"],
  description:"Geometric framework linking crease parameters to joint motion at low pressure.",
  results:[
    ["fig","Figure 1. A molded chamber at rest and pressurised (placeholder).","#6F8F8A"],
    ["p","Placeholder text showing LaTeX: to first order the joint torque is $\\tau = p\\,A\\,\\ell$, with pressure $p$, effective area $A$ and lever arm $\\ell$. Display equations get their own paragraph:"],
    ["p","$$\\tau(\\theta) = p\\,A\\,\\ell(\\theta)$$"],
    ["fig","Figure 2. Measured torque against pressure (placeholder).","#4F6F6B"]
  ],
  resources:[["Crease-Encoded Soft Origami Chambers","#","article"],["Dataset and scripts","#","code"]],
  code:"# placeholder: load one test and fit a line\nimport numpy as np\np, tau = np.loadtxt('test01.csv', delimiter=',', unpack=True)\nslope = np.polyfit(p, tau, 1)[0]   # N.m per kPa"
});
