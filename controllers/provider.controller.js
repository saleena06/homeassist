const { Provider, ServiceType } = require('../models');

exports.createProvider = async (req, res) => {
  try {

    const provider = await Provider.create(req.body);

    res.status(201).json(provider);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllProviders = async (req, res) => {
  try {

    const providers = await Provider.findAll({
      include: [
        {
          model: ServiceType
        }
      ]
    });

    res.status(200).json(providers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProviderById = async (req, res) => {
  try {

    const provider = await Provider.findByPk(
      req.params.id,
      {
        include: [ServiceType]
      }
    );

    if (!provider) {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    res.status(200).json(provider);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProvider = async (req, res) => {
  try {

    const provider = await Provider.findByPk(
      req.params.id
    );

    if (!provider) {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    await provider.update(req.body);

    res.status(200).json(provider);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteProvider = async (req, res) => {
  try {

    const provider = await Provider.findByPk(
      req.params.id
    );

    if (!provider) {
      return res.status(404).json({
        message: 'Provider not found'
      });
    }

    await provider.destroy();

    res.status(200).json({
      message: 'Provider deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};