import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { searchFieldTextChange } from '../../../../actions/SearchActions'
import SearchResultListItem from './SearchResultListItem'

class SearchModal extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         isVisible: true
    //     }
    // }

    _onChangeText(text) {
        this.props.searchFieldTextChange(this.props.searchType, text)
    }

    _clearText() {
        this.props.searchFieldTextChange(this.props.searchType, '')
    }

    _renderResults() {
        return this.props.searchResults.map((item, index) => 
            <SearchResultListItem key={index} info={item} onPress={() => this.props.onSearchResultPress(item)} />
        )
    }

    _dismissModal() {
        this._clearText()
        this.props.parentDismissModal()
    }

    render() {
        const { searchFieldText, isVisible } = this.props
        const { containerStyle, modalStyle, modalContentContainerStyle } = styles

        return (
            <View style={containerStyle}>
                <Modal isVisible={isVisible} style={modalStyle} onBackdropPress={this._dismissModal.bind(this)}>
                    <View style={modalContentContainerStyle}>
                        <SearchBar
                            showLoading
                            platform="ios"
                            clearIcon
                            round
                            value={searchFieldText}
                            lightTheme
                            placeholder='Search' 
                            onChangeText={text => this._onChangeText(text)}
                            onClearText={() => this._clearText()}
                        />
                        <View>
                            <ScrollView>
                                {this._renderResults()}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = {
    containerStyle: {

    },
    modalStyle: {
        margin: 30,
        padding: 20, 
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalContentContainerStyle: {
        flex: 1
    }
}

const mapStateToProps = state => {
    return {
        searchFieldText: state.search.searchFieldText, 
        searchResults: state.search.searchResults
    }
}

export default connect(mapStateToProps, { searchFieldTextChange })(SearchModal)
