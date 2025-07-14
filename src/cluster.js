import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) { //isPrimary checks if the cluser.js file is being loaded as a primary process
  const cpus = os.availableParallelism(); //tell us how many parallel processes we can run based on the number of cpus available

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork(); //fork as many worker processes as there are CPUs
  }
} else {
  import('./server.js');
}