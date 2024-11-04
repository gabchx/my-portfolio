export const experience = [
  {
    company: 'OVHcloud',
    position: 'R&D Quantum Software Engineer Intern',
    duration: 'April 2024 - Present (7 months)',
    location: 'Station F - Clichy Levallois, Paris, France',
    responsibilities: [
      'Collaborated with a photonic quantum computer team to develop a quantum entropy source as a service for cryptographic use cases.',
      'Partnered with physicists to advance the adoption of quantum protocols by engineering teams.',
      'Validated requests for proposals (RFPs) to drive the development of a fully integrated microservices stack, including databases, APIs, workers, a CLI, and performance monitoring tools.',
      'Utilized Python for developing and implementing quantum algorithms.',
      'Contributed to performance monitoring solutions to ensure system reliability and efficiency.',
    ],
  },
  {
    company: 'AFD Technologies',
    position: 'Cloud Engineer Intern',
    duration: 'June 2022 - August 2022 (3 months)',
    location: 'Paris, Île-de-France, France',
    responsibilities: [
      'Managed a multi-account AWS cloud environment to ensure optimal performance and security.',
      'Implemented CI/CD pipelines for Java applications using GitHub, CodeBuild/Deploy, S3, and EC2 to streamline deployment processes.',
      'Deployed and managed EKS autoscaling clusters using EKS and ECR to handle varying workloads effectively.',
      'Translated physical infrastructure components into code using Terraform for stateful deployments.',
      'Led project management efforts employing Agile Scrum methodologies to enhance team collaboration and project delivery.',
    ],
  },
  {
    company: 'Oneytrust',
    position: 'Cybersecurity Intern',
    duration: 'July 2021 (1 month)',
    location: 'Lille, Hauts-de-France, France',
    responsibilities: [
      'Operated and managed the hierarchy of a company specializing in IT solutions.',
      'Conducted studies on digital profiling, fraud prevention, and cybersecurity measures to enhance system security.',
      'Handled level ticketing and infrastructure monitoring to maintain operational integrity.',
      'Received training in database management and SQL querying to support data-driven decisions.',
      'Developed DevOps pipelines and engaged in cloud computing tasks to streamline development and deployment processes.',
    ],
  },
];

export const projects = [
  {
    title: 'Optimised Quantum Gate-based Computing Emulator',
    subtitle: 'Quantum computing',
    description:
      'Homemade drag and drop quantum emulator, made in Rust & Python for resources benchmark.\n',
    image: './qe.gif',
    link: 'https://github.com/gabchx/quantum-emulator',
  },
  {
    title:
      'Deep learning for person Re-Identification in video assets, graph based aproach',
    subtitle: 'Reasearch Project',
    description:
      'The project is involved using Deep Learning to re-identify individuals across video feeds.',
    image: './traker.gif',
    link: 'https://www.linkedin.com/in/gabriel-chaix/details/projects/',
  },
  {
    title: 'Knapsack problem, Technical interview',
    subtitle: 'Graph Theory',
    description: 'Constraint Satisfaction aproach and Greedy Search',
    image: './knapsack.gif',
    link: 'https://drive.google.com/drive/folders/1xkx61aSz4FLB21zlgwsgqkKbDCs0eCtd?usp=share_link',
  },
  {
    title: 'MinMax for Ultimate Tic Tac Toe',
    subtitle: 'Graph Theory',
    description: 'Winner of an algoritm battle.',
    image: './u3t.png',
    link: 'https://drive.google.com/drive/folders/1tCjGWoQH1jVu4k3t7YOX5WxWVF6awE2L?usp=share_link',
  },
];

export const skills = [
  {
    title: 'Python',
    image: './python.png',
  },
  { title: 'Rust', image: './rust.png' },
  {
    title: 'Tensorflow',
    image: './tf.png',
  },
  {
    title: 'Qiskit',
    image: './qiskit.png',
  },
  {
    title: 'Kubernetes',
    image: './k8s.png',
  },
  {
    title: 'Linux',
    image: './linux.png',
  },
  {
    title: 'Node.js',
    image: './node-js.png',
  },
  {
    title: 'Cloud Services',
    image: './aws.png',
  },
];

export const contact = {
  name: 'Gabriel Chaix',
  email: 'hi@gab.cx',
  cv: {
    url: 'https://drive.google.com/uc?export=download&id=1kfWLjW7ZgV7GYvPzJt2VroiTZ4cs1ebo',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/gabriel-chaix/',
    text: 'linkedin.com/in/gabriel-chaix/',
  },
  github: {
    url: 'https://github.com/gabchx',
    text: 'github.com/gabchx',
  },
};

// Define the places you've been to
export const places = [
  {
    id: 1,
    name: 'Paris, France',
    position: [48.8566, 2.3522],
  },
  {
    id: 2,
    name: 'New York, USA',
    position: [40.7128, -74.006],
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    position: [35.6762, 139.6503],
  },
];
