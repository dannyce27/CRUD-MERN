import sales from "../models/sales.js"
import salesModel from "../models/sales.js"


const salesController = {}
salesController.salesPerCategory = async (req, res) =>{

try {
    
    const result = await salesModel.aggregate(

        [
            {
                $group: {
                    _id: "$category",
                    totalVentas: {$sum: "$total"}
                }
        },
        //ordernar:

        {
            $sort: {totalVentas: -1}
        }
    ]

    )

    res.status(200).json(result)


} catch (error) {
    console.log("error" + error)
    res.status(500).json({message: "Internal server error"})
}
    
}

salesController.bestSallingProducts = async (req, res) => {

    const result = await salesModel.aggregate(

        [{


            $group: {
                _id: { _id: "$product"},
                cantidad: {$sum: 1}
            }
        },

        {
            $sort: {cantidad: -1}
        },

        {
            $limit: 5
        }

    
    ]
    )

    res.status(200).json(result)
}

salesController. frecuentCustomers  = async (req, res)  => {

    try {
        
        const result = await salesModel.aggregate(
            [{


                $group: {
                    _id: "$customer",
                    compras: {$sum: 1}
                }
            },
            {
                $sort: {compras: -1}
            },

            {
                $limit: 3
            }
        
        ]
        )
    } catch (error) {
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }
}



salesController.totalEarnings = async (req, res) => {
    try {
        const result = await salesModel.aggregate(

            [
                {
                    $group: {
                        _id: null,
                        gananciasTotales: {$sum: "$total"}
                    }
                }
            ]
        )

        res.status(200).json(result)
    } catch (error) {
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }
}

salesController.insertSales = async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
            // Insertar múltiples ventas
            await salesModel.insertMany(data);
            res.status(200).json({ message: "Ventas guardadas correctamente" });
        } else {
            // Insertar una sola venta
            const { product, category, customer, total, date } = data;

            const newSale = new salesModel({ product, category, customer, total, date });
            await newSale.save();

            res.status(200).json({ message: "Venta guardada correctamente" });
        }
    } catch (error) {
        console.error("Error al insertar venta(s):", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export default salesController;