import env from '../config/env';

/**
 * @param id user Id
 * @param hash unique URL hash
 */

const getLink = async (id, hash) => {
  const link = `${env.protocol}://${env.domain}/#/reset-password?id=${id}&hash=${hash}`;
  return link;
};

export default getLink;
