import { User } from "../../models/user.models.js"
import { encrypt_password } from "../../utils/bcrypt.js"

export const get_all_users = async (req, res) => {
    try {
        // const { _id } = req.headers

        // const user = await User.findById(_id)
        // if (!user) return res.status(401).json({ error: 'user not found' })

        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

export const get_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update_user = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone_number, about, balance, current_balance, ibn_number, bank_name, credit, deposit, withdrawal, standard, verify, role, status } = req.body;


        const find_user = await User.findById(req.params.id);
        if (!find_user) return res.status(400).json({ message: 'user not found' })

        // const decrypt_password = compare_password(password, find_user.password)
        // console.log(decrypt_password)

        const updated_data = {
            first_name,
            last_name,
            email,
            password: await encrypt_password(password),
            phone_number,
            about,
            balance,
            current_balance,
            ibn_number,
            bank_name,
            credit,
            deposit,
            withdrawal,
            standard,
            verify,
            role,
            status
        };

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updated_data,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const delete_user = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}